import { resize } from '../../modules/image';

export const resizing = {
	resize: async (_, { size }, ctx, info) => {
		const image = await resize(size);

		return ctx.db.mutation.createCleverbotDialogue({
			data: {
				date: new Date(),
				query: message,
				reply,
			},
		}, info);
	},
};
