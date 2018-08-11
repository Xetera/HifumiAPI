import * as jwt from 'jsonwebtoken';

const isLoggedIn = async (resolve, parent, args, ctx) => {
	// Include your agent code as Authorization: <token> header.
	const token = ctx.request.get('Authorization');

	if (!token) {
		throw new Error('Missing Authorization header');
	}

	const auth = jwt.verify(token, process.env.JWT_SECRET);

	if (!auth) {
		throw new Error('Unauthorized');
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

export const protectedEndpoints = {
	Query: {
	},
	Mutation: {
		say: isLoggedIn,
		uploadFile: isOwner,
		resize: isLoggedIn,
	},
};
