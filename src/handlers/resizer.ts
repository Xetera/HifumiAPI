import * as sharp from 'sharp'
import {IResizeEndpointBody, isResizableMedia, isResizableMediaArray} from "../interfaces/resize.interface";
import axios from "axios";
import * as sizeOf from 'image-size'
import {Utils} from "../configuration/path";

export const fetchImage = (url: string) => axios.get(url, {responseType: 'arraybuffer'});
export const scaleToHeight = (width: number, height: number, target?: number): [number, number] => {
	if (height < target || !target){
		return [width, height];
	}

	const ratio = height / target;
	const newHeight = Math.trunc(height / ratio);
	const newWidth = Math.trunc(width / ratio);

	return [newWidth, newHeight];
};

export const resize = (path: string | Buffer, format, width, height, output) => {
	let transform = sharp(path).max().withoutEnlargement();
	if (format){
		transform = transform.toFormat(format);
	}
	if (width || height){
		transform = transform.resize(width, height);
	}
	return transform.toFile(output);
};


export const parseBody = async (body: IResizeEndpointBody) => {
	if (isResizableMedia(body)){
		const response = await fetchImage(body.url);
		const buffer = response.data;

		const sizeData = await sizeOf(buffer);
		const [width, height] = scaleToHeight(sizeData.width, sizeData.height, body.height);
		const outputPath = Utils.getUploadPath('discord', 'test.' + sizeData.type);

	}
	else if (isResizableMediaArray(body)){

	}
};
