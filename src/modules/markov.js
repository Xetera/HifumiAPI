import Text from 'markov-chains-text';
import * as fs from 'fs';

// const object = JSON.parse(fs.readFileSync('src/modules/JEOPARDY_QUESTIONS1.json', 'utf-8'));
// const files = object.map(o => o.question).join('\n');

export const generateSentence = async (db, params = {}) => {
	const messages = await db.query.messages({ where: { ...params } });
	const chain = new Text(files);
	return chain.makeSentence();
};
