"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("../logger/winston");
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var endpoint_1 = require("../routes/endpoint");
exports.createUploader = function (folder) {
    return new Promise(function (resolve, reject) {
        if (!folder) {
            resolve([multer({ storage: endpoint_1.storage() }).single('media'), '']);
        }
        var target = path.join(endpoint_1.UPLOAD_FOLDER, folder);
        fs.exists(target, function (exists) {
            if (!exists) {
                fs.mkdir(target, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve([multer({ storage: endpoint_1.storage(target) }).single('media'), target]);
                });
            }
            return resolve([multer({ storage: endpoint_1.storage(target) }).single('media'), target]);
        });
    });
};
function saveMedia(req, res, folder) {
    return new Promise(function (resolve, reject) {
        exports.createUploader(folder).then(function (out) {
            var uploader = out[0], target = out[1];
            uploader(req, res, function (err) {
                if (err) {
                    winston_1.logger.error(err);
                    reject(err);
                }
                winston_1.logger.info('Uploaded a file');
                winston_1.logger.info(req.file.filename);
                resolve(req.file.filename);
            });
        });
    });
}
exports.saveMedia = saveMedia;
