// @flow
import * as aws from 'aws-sdk';
import Hashids from 'hashids';

const bucket = new aws.S3();
const hash = new Hashids('Hifumi API');

export const uploadFile = (file: Buffer, mime: string) => new Promise((res, rej) => {
	console.log('uploading file to s3')
	const key = hash.encode(Date.now());

	let extension;
	if (mime.includes('/')){
		extension = mime.split('/').pop();
	} else {
		extension = mime;
	}

	if (!['png', 'gif', 'jpeg', 'jpg'].includes(extension)) {
		throw new Error("Invalid image extension")
	}
	const params = {
		ACL: 'public-read',
		Bucket: 'hifumicdn',
		Key: `${key}.${extension}`,
		Body: file,
		ContentType: mime || 'binary',
	};
	bucket.putObject(params, (error) => {
		if (error) {
			return rej(error);
		}
		return res(`${key}.${extension}`);
	});
});
