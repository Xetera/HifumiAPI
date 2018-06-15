"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var level = process.env.LOG_LEVEL || 'debug';
var alignedWithColorsAndTime = winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf(function (info) { return info.timestamp + " [" + info.level + "]: " + info.message; }));
exports.logger = winston.createLogger({
    level: level,
    format: alignedWithColorsAndTime,
    transports: [
        new winston.transports.File({
            filename: 'data/console.log',
            maxsize: 1024 * 1024 * 5,
            zippedArchive: true,
        }),
        new winston.transports.Console({
            format: alignedWithColorsAndTime
        })
    ]
});
