// @flow
import * as aws from 'aws-sdk';
import Hashids from 'hashids';

const bucket = new aws.S3();
const hash = new Hashids('Hifumi API');

export const uploadFile = (file: Buffer, mime: string) => new Promise((res, rej) => {
	const key = hash.encode(Date.now());
	const extension = mime.split('/').pop();
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
