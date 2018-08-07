// @flow
import multer from 'multer';
import { uploadFile } from '../modules/uploader';

const upload = multer();

export const setupREST = (app) => {
	app.post('/upload', upload.single('media'), async (req, res) => {
		if (!req.file) {
			return res.status(400).send('Upload must include a multipart file');
		}
		console.log(req.file);
		let key;
		try {
			key = await uploadFile(req.file.buffer, req.file.mimetype);
		} catch (err) {
			res.send(err);
		}
		res.redirect(`http://cdn.hifumi.io/${key}`);
	});
};
