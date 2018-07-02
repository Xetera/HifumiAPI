const skipper = require('skipper-s3');
const s3Client = require('s3');

/**
 * CdnController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const s3 = s3Client.createClient({
    s3Options: {
        accessKeyId: process.env.BUCKET_KEY,
        secretAccessKey: process.env.BUCKET_SECRET
    }
});

const allowedExtensions = ['png', 'gif', 'jpg', 'jpeg', 'webm', 'mp3'];
const isValidMedia = (input) => {
    const sections = input.split('.');
    if (sections.length < 2) {
        return false;
    }
    else if (!allowedExtensions.includes(sections.pop())){
        return false;
    }
    return true;
};

module.exports = {
    serve: async (req, res, next) => {
        const image = req.param('image');
        const user = req.param('user');
        sails.log.info(`[CDN]: Got a request for ${user}/${image} from ${req.ip}`);
        if (!isValidMedia(image)){
            return res.badRequest('Invalid Media Request');
        }

        const response = await Media.find({
            urlId: image,
            user
        });
        if (response.length > 1 ){
            sails.log.warn("Got multiple records for something that should've been unique.");
        }

        const entry = response[0];

        if (!entry || !entry.key){
            sails.log.info(`[CDN]: Could not find media ${user}/${image}`);
            return res.notFound();
        }

        const params = {
            Bucket: 'hifumicdn',
            Key: entry.key
        };

        const stream = s3.downloadStream(params);
        sails.log.info(`[CDN]: Delivered media successfully.`);
        stream.pipe(res);

    }
};

