import * as fs from "fs";
import * as path from "path";
import {logger} from "../../logger/winston";
import {saveMedia} from "../../handlers/uploader";
import * as multer from "multer";
import * as Hashids from 'hashids'
import {Config} from "../../configuration/env";

const hash = new Hashids('Hifumi');


/**
 * Unfortunately multer doesn't let us specify the upload path so we have
 * to create a new instance of diskStorage every time we want to save
 * something to a different directory
 */
export const storage = (dest: string = Config.uploadFolder()) => multer.diskStorage({
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

export const endpoints = (router) => {
	router.post('/upload', (req, res, next) => {
		const secret = Config.uploadKey();
		if (secret === undefined) {
			logger.error(
				'A request to upload a picture was refused ' +
				'because the UPLOAD_KEY env variable is not set.'
			);

			return next('Upload service unavailable.');
		}

		else if (req.header('UPLOAD_KEY') !== secret) {
			logger.error('Received an upload request with an invalid key');
			return res.end('Invalid upload key');
		}

		const user = req.header('USER');
		const UPLOAD_FOLDER = Config.uploadFolder();
		if (user && !fs.existsSync(path.join(UPLOAD_FOLDER, user))) {
			try {
				fs.mkdirSync(path.join(UPLOAD_FOLDER, user));
			}
			catch (err) {
				// debug
				return next(err);
			}
		}
		saveMedia(req, res, user).then((filename) => {
			let ext;
			if (user) {
				ext = `${user}/${filename}`;
			}
			else {
				ext = filename;
			}
			return res.redirect(`https://cdn.hifumi.io/${ext}`)
		}).catch(err => {
			logger.error(err);
			return next('Something went wrong')
		})
	});
};
