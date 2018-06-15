"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var test_1 = require("./test");
var uploader_1 = require("./uploader");
var cors = require("cors");
exports.UPLOAD_FOLDER = process.env['UPLOAD_FOLDER'] || './uploads';
var Hashids = require("hashids");
var droplet_1 = require("./droplet");
var stats_1 = require("./stats");
var hash = new Hashids('Hifumi');
/**
 * Unfortunately multer doesn't let us specify the upload path so we have
 * to create a new instance of diskStorage every time we want to save
 * something to a different directory
 */
exports.storage = function (dest) {
    if (dest === void 0) { dest = exports.UPLOAD_FOLDER; }
    return multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, dest);
        },
        filename: function (req, file, callback) {
            var copy = file.originalname;
            var parts = copy.split('.');
            var extension = parts.pop();
            var filename = hash.encode(Date.now()) + "." + extension;
            callback(null, filename);
        }
    });
};
exports.endpoint = express.Router();
var corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
exports.endpoint.use(cors(corsOptions));
droplet_1.dropletEndpoint(exports.endpoint);
stats_1.statsEndpoint(exports.endpoint);
test_1.testEndpoint(exports.endpoint);
uploader_1.uploadEndpoint(exports.endpoint);
