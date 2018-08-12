// @flow
import jwt from 'jsonwebtoken';
import axios from 'axios';

export class AuthError extends Error {
	status: number;

	constructor() {
		super('Not authorized');
		this.status = 401;
	}
}

export interface JwtResponse {
	token: string;
	exp: number;
}


export const signJwt = async (payload: Object): Promise<JwtResponse> => {
	const expiry = process.env.TOKEN_EXPIRE || '10d';
	const token = await jwt.sign(
		payload, process.env.JWT_SECRET, { expiresIn: expiry },
	);
	const { exp } = await jwt.decode(token);
	return { token, exp };
};


export const fetchUrlBuffer = async (url: string): Promise<Buffer> => {
	const response = await axios.get(url, { responseType: 'arraybuffer' });
	return response.data;
};
