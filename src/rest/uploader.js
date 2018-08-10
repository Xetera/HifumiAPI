// @flow
import Multer from 'multer';
import {uploadFile} from '../modules/uploader';

const uploader: Multer = new Multer();

export const uploaderService = (app) => {
	app.post('/upload', uploader.single('media'), async (req, res) => {

		if (!req.get('Super-Secret')) {
			throw new Error("Unauthorized!")
		}

		console.log('GOT A FILE UPLOAD REQUEST');

		let key;
		try {
			key = await uploadFile(req.file.buffer, req.file.mimetype);
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
		const response = {
			id: key,
			url: `http://cdn.hifumi.io/${key}`
		}
		return res.send(response);
	});
};
