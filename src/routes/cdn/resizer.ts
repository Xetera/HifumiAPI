import {Router} from "express-serve-static-core";
import {resize} from "../../handlers/resizer";
import {Utils} from "../../configuration/path";
import * as sizeof from 'image-size'
import axios from 'axios'
import {IResizeEndpointBody} from "../../interfaces/resize.interface";


const TARGET_HEIGHT = 150;
export const endpoints = async (router: Router) => {
	router.post('/resize', async(req, res, next) => {
		const widthString = req.query.width;
		const heightString = req.query.height;
		const body: IResizeEndpointBody = req.body;

		const url = req.query.image;
		const buffer = await axios.get(url, {responseType: 'arraybuffer'});
		const data = await sizeof(buffer.data);
		console.log(data.width);
		console.log(data.height);
		let ratio, newHeight, newWidth;
		if (data.height <= TARGET_HEIGHT){
			ratio = 1;
		} else {
			ratio = data.height / TARGET_HEIGHT;
		}
		newHeight = Number((data.height / ratio).toFixed(0));
		newWidth = Number((data.width / ratio).toFixed(0));

		let width, height;
		if (widthString) {
			width = Number(widthString);
		}
		if (heightString) {
			height = Number(heightString);
		}
		//res.type(`image/${format || 'png'}`);

		// sharp(req.file.path).resize(width, height).toFile(Utils.getUploadPath('discord', 'test.' + format), (err, info) => {
		//
		// });
		const output = Utils.getUploadPath('discord', 'test.' + data.type);
		resize(buffer.data, data.type, newWidth, newHeight, output).then(f => {
			console.log(output);
			res.send({message: output});
		})
	});
};
