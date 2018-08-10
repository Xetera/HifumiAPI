import { GraphQLUpload } from 'apollo-upload-server';
import { auth } from './mutations/auth';
import { cleverbot } from './mutations/cleverbot';
import { graphqlUploader } from './mutations/graphqlUploader';

module.exports = {
	Query: {

	},
	Mutation: {
		...auth,
		...cleverbot,
		graphqlUploader,
	},
	Upload: GraphQLUpload,
};
