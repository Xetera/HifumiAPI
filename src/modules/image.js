// @flow
import { gm } from '../utils';

const sizing = {
	Medium: 250,
	Small: 200,
	Smallest: 250,
};

export const resize = (image: Buffer, size: string) => new Promise((resolve, reject) => {
	gm(image)
		.resize(null, sizing[size])
		.toBuffer((err, buffer) => {
			if (err) {
				return reject(err);
			}
			return resolve(buffer);
		});
});
