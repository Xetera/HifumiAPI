import { bcrypt } from 'bcryptjs';
import { jwt } from 'jsonwebtoken';

export const auth = {
	async signup(parent, args, ctx) {
		const password = await bcrypt.hash(args.password, 10);
		const client = await ctx.db.mutation.createClient({
			data: { ...args, password },
		});

		return {
			token: jwt.sign({ userId: client.id }, process.env.JWT_SECRET),
			...client,
		};
	},
};
