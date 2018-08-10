const { say } = require('../../modules/chat');

const cleverbot = {
	say: async (_, { message }, ctx, info) => {
		const reply = await say(message);
		return ctx.db.mutation.createCleverbotDialogue({
			data: {
				date: new Date(),
				query: message,
				reply,
			},
		}, info);
	},
};

module.exports = { cleverbot };
