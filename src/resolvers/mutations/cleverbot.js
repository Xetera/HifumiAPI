const { say } = require('../../modules/chat');

const cleverbot = {
	say: async (_, { message }, ctx, info) => {
		console.log('mutation handler for say');
		const reply = await say(message);
		console.log(reply)
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
