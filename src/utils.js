// @flow
import * as GM from 'gm';

export const gm = GM.subClass({ imageMagick: true });

export class AuthError extends Error {
	status: number;

	constructor() {
		super('Not authorized');
		this.status = 401;
	}
}

interface MediaMetadata {
	width: number;
	height: number;

}

export const fetchImageMedatada = (buffer: Buffer) => new Promise((resolve, reject) => {
	gm(buffer)
		.identify();
});
