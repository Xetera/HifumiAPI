import { GraphQLUpload } from 'apollo-upload-server';
import { authMutation } from './mutations/authMutation';
import { cleverbot } from './mutations/cleverbot';
// import { graphqlUploader } from './mutations/graphqlUploader';
import { resizing } from './mutations/resizing';
import { messages } from './queries/messages';
import { authQuery } from './queries/authQuery';
import { uploader } from './mutations/graphqlUploader';

module.exports = {
	Query: {
		...messages,
		...authQuery,
	},
	Mutation: {
		...authMutation,
		...cleverbot,
		...resizing,
		...uploader,
	},
	Upload: GraphQLUpload,
};
