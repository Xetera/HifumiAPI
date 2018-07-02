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
        const urlParams = req.url.split('/');
        const key = urlParams.pop();
        const user = urlParams.pop();
        console.log(key);
        if (key === 'favicon.ico'){
           return res.send('https://cdn.hifumi.io/hifumi_avatar.png');
        }
        if (!isValidMedia(key)){
            return res.badRequest('Invalid Media Request');
        }

        const params = {
            Bucket: 'hifumicdn',
            Key: key
        };
        const stream = s3.downloadStream(params);
        stream.pipe(res);

    }
};

