import * as express from 'express'
import * as multer from 'multer'
import {testEndpoint} from "./test";
import {uploadEndpoint} from "./uploader";
import * as cors from 'cors'
export const UPLOAD_FOLDER = process.env['UPLOAD_FOLDER'] || './uploads';
import * as Hashids from 'hashids'
import {statsEndpoint} from "./stats";

const hash = new Hashids('Hifumi');
/**
 * Unfortunately multer doesn't let us specify the upload path so we have
 * to create a new instance of diskStorage every time we want to save
 * something to a different directory
 */
export const storage = (dest: string = UPLOAD_FOLDER) =>  multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, dest);
    },
    filename: (req, file, callback) => {
        const copy = file.originalname;
        const parts = copy.split('.');
        const extension = parts.pop();
        const filename = `${hash.encode(Date.now())}.${extension}`;
        callback(null, filename);
    }
});

export const endpoint = express.Router();

const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
endpoint.use(cors(corsOptions));

//dropletEndpoint(endpoint);
statsEndpoint(endpoint);
testEndpoint(endpoint);
uploadEndpoint(endpoint);

