import bcrypt from 'bcryptjs';
import { signJwt } from '../../utils';

export const authMutation = {
	async signup(parent, { email, password, name }, ctx) {
		const saltRounds = Number(process.env.SALT_ROUNDS || 8);
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		// handle existing user here
		const {
			userId, botId,
		} = await ctx.db.mutation.createClient({
			data: {
				email, name, hash, salt,
			},
		});

		const { token, exp: expiration } = await signJwt({ userId });
		return {
			token,
			botId,
			expiration,
			email,
			name,
		};
	},

};
