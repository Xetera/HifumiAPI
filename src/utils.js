// @flow
import * as GM from 'gm';
import jwt from 'jsonwebtoken';

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

export interface JwtResponse {
	token: string;
	exp: number;
}

export const fetchImageMedatada = (buffer: Buffer) => new Promise((resolve, reject) => {
	gm(buffer)
		.identify();
});

export const signJwt = async (payload: Object): Promise<JwtResponse> => {
	const expiry = process.env.TOKEN_EXPIRE || '10d';
	const token = await jwt.sign(
		payload, process.env.JWT_SECRET, { expiresIn: expiry },
	);
	const { exp } = await jwt.decode(token);
	return { token, exp };
};
