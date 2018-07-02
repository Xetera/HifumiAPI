const Hashids = require('hashids');
const hasher = new Hashids('hifumi', 8);

/**
 * MediaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const checkFile = (file, callback) => {
    try {
        sails.helpers.verifier.with({filename: file})
    } catch (err) {
        callback(err);
    }
    const extension = file.split('.');

    callback(null, extension.pop());
};

const generateFilename = (ext) => {
    const hash = hasher.encode(Date.now());
    return hash + '.' + ext;
};


module.exports = {

    upload: async (req, res) => {
        sails.log.info(`Got an upload request from ${req.ip}`);
        const user = req.header('user');
        const key = req.header('upload-key');
        const file = req.file('media');

        if (!key || key !== process.env.UPLOAD_KEY){
            sails.log.info(`Rejected unauthorized upload request.`);
            return res.forbidden();
        }

        else if (!user) {
            sails.log.info(`Rejected upload request due to missing user header.`);
            return res.badRequest({
                message: "Missing 'user' header"
            });
        }

        else if (!file) {
            sails.log.info(`Rejected upload request due to a key mismatch.`);
            return res.badRequest({
                message: "File must be uploaded under a key named 'media'",
            });
        }

        file.upload({
            adapter: require('skipper-s3'),
            key: process.env.BUCKET_KEY, // process.env.BUCKET_KEY,
            secret: process.env.BUCKET_SECRET,
            bucket: 'hifumicdn'
        }, async (err, filesUploaded) => {
            if (err) {
                sails.log.error(`[API/Media]: Rejected an upload request\n${err}`);
                return res.serverError(err);
            }
            const file = filesUploaded[0];
            const filename = file.fd;
            const extension = filename.split('.').pop();
            const urlId = generateFilename(extension);
            await Media.create({
                key: filename,
                user: user,
                date: new Date(),
                urlId: urlId,
                extension: extension,
                size: file.extra.size
            });
            sails.log.info(`Successfully uploaded and saved a ${size / 1000}mb file.`);
            return res.ok({
                message: 'Media uploaded',
                code: 200,
                id: urlId,
                size: file.extra.size,
                user: user,
                url: `http://cdn.testhifumi.io:1337/${user}/${urlId}`
            })
        });
    }
};
