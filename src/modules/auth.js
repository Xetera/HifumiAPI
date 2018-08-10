import * as jwt from 'jsonwebtoken';

const isLoggedIn = async (resolve, parent, args, ctx) => {
	// Include your agent code as Authorization: <token> header.
	const token = ctx.request.get('Authorization');

	if (!token) {
		throw new Error('Missing authentication!');
	}
	const auth = jwt.verify(token, process.env.JWT_SECRET);

	if (!auth) {
		throw new Error('Not authorised!');
	}

	return resolve();
};

const isOwner = async (resolve, parent, args, ctx) => {
	// Include your agent code as Authorization: <token> header.

	const permit = ctx.request.get('Authorization') === process.env.SUPER_SECRET;

	if (!permit) {
		throw new Error('Not authorised!');
	}

	return resolve();
};

export const protectedEndpoints = {
	Query: {
		say: isLoggedIn,
	},
	Mutation: {
		uploadFile: isOwner,
	},
};
