// @flow
import * as GM from 'gm';

export const gm: GM = GM.subClass({ imageMagick: true });

class AuthError extends Error {
	constructor() {
		super('Not authorized');
	}
}

interface MediaMetadata {
	width: number;
	height: number;

}

export const fetchImageMedatada = (buffer: Buffer) => new Promise((resolve, reject) => {
	gm(buffer)
		.identify()
});
