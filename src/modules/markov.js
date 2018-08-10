const Text = require('markov-chains-text');


const generateSentence = async (db, params = {}) => {
	const messages = await db.query.Message({ where: { ...params } });
	const chain = new Text(messages);
	return chain.makeSentence();
};

module.exports = { generateSentence };
