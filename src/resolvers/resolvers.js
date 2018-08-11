import { GraphQLUpload } from 'apollo-upload-server';
import { auth } from './mutations/auth';
import { cleverbot } from './mutations/cleverbot';
// import { graphqlUploader } from './mutations/graphqlUploader';
import { resizing } from './mutations/resizing';
import { messages } from './queries/messages';

module.exports = {
	Query: {
		...messages,
	},
	Mutation: {
		...auth,
		...cleverbot,
		/// graphqlUploader,
		...resizing,
	},
	Upload: GraphQLUpload,
};
