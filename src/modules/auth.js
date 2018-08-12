import * as jwt from 'jsonwebtoken';
import { AuthError } from '../utils';

const isLoggedIn = async (resolve, parent, args, ctx) => {
	// Include your agent code as Authorization: <token> header.
	const token = ctx.request.get('Authorization');

	if (!token) {
		throw new Error('Missing Authorization header');
	}

	let auth = token.replace('Bearer ', '');

	try {
		if (token === process.env.SUPER_SECRET) {
			return resolve();
		}
		auth = await jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		throw new Error('Invalid Authorization header');
	}

	ctx.jwt = auth;
	if (!auth) {
		throw new AuthError();
	}
	return resolve();
};

const isOwner = async (resolve, parent, args, ctx) => {
	const permit = ctx.request.get('Authorization') === process.env.SUPER_SECRET;

	if (!permit) {
		throw new Error('Unauthorized');
	}

	return resolve();
};

// TODO: Rate Limiting
export const protectedEndpoints = {
	Query: {
	},
	Mutation: {
		say: isLoggedIn,
		uploadFile: isOwner,
		resize: isLoggedIn,
	},
};
