import {logger} from "../logger/winston";
import * as fs from "fs";
import * as path from "path";
import * as multer from "multer";
import {storage} from "../routes/cdn/uploader";
import {RequestHandler} from "express";
import {Config} from "../configuration/env";


export const createUploader = (folder?: string): Promise<RequestHandler> => {
    return new Promise((resolve, reject) => {
        if (!folder) {
            resolve(multer({storage: storage()}).single('media'));
        }
        const target = path.join(Config.uploadFolder(), folder);
        fs.exists(target, exists => {
            if (!exists) {
                fs.mkdir(target, err => {
                    if (err){
                        return reject(err);
                    }
                    return resolve(multer({storage: storage(target)}).single('media'));
                });
            }
            return resolve(multer({storage: storage(target)}).single('media'));
        });
    });
};

export const saveMedia = (req, res, folder) => {
    return new Promise((resolve, reject) => {
        createUploader(folder).then(uploader => {
            uploader(req, res, (err) => {
                if (err){
                    return reject(err);
                }
                logger.info('Uploaded a file');
                logger.info(req.file.filename);
                resolve(req.file.filename);

            })
        })
    });
};
