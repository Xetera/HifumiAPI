"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var endpoint_1 = require("./endpoint");
var path = require("path");
var winston_1 = require("../logger/winston");
var index_1 = require("../index");
var uploader_1 = require("../handlers/uploader");
exports.uploadEndpoint = function (router) {
    router.post('/upload', function (req, res, next) {
        if (index_1.secret === undefined) {
            winston_1.logger.error('A request to upload a picture was refused ' +
                'because the UPLOAD_SECRET env variable is not set.');
            return next('Upload service unavailable.');
        }
        else if (req.header('UPLOAD_KEY') !== index_1.secret) {
            winston_1.logger.error('Received an upload request with an invalid key');
            return res.end('Invalid upload key');
        }
        var user = req.header('USER');
        if (user && !fs.existsSync(path.join(endpoint_1.UPLOAD_FOLDER, user))) {
            try {
                fs.mkdirSync(path.join(endpoint_1.UPLOAD_FOLDER, user));
            }
            catch (err) {
                // debug
                return next(err);
            }
        }
        uploader_1.saveMedia(req, res, user).then(function (filename) {
            var ext;
            if (user) {
                ext = user + "/" + filename;
            }
            else {
                ext = filename;
            }
            return res.redirect("https://cdn.hifumi.io/" + ext);
        }).catch(function (err) {
            winston_1.logger.error(err);
            return next('Something went wrong');
        });
    });
};
