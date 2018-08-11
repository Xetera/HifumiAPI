import { bcrypt } from 'bcryptjs';
import { jwt } from 'jsonwebtoken';
import { AuthError } from '../../utils';

export const auth = {
	async signup(parent, args, ctx) {
		const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
		const hash = await bcrypt.hash(args.password, salt);
		const client = await ctx.db.mutation.createClient({
			data: { ...args, hash, salt },
		});

		return {
			token: jwt.sign({ userId: client.id }, process.env.JWT_SECRET),
			...client,
		};
	},
	async auth(parent, { name, password }, ctx) {
		const client = await ctx.db.query.clients({
			where: { name },
		});

		if (!client) {
			// We don't want to give tips on wrong username/password
			throw new AuthError();
		}

		const hash = await bcrypt.hash(password, client.salt);
		const authorized = hash === client.hash;

		if (!authorized) {
			throw new AuthError();
		}

		const token = jwt.sign()
		return {

		}
	},
};
