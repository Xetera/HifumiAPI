// @flow
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { apolloUploadExpress, GraphQLUpload } from 'apollo-upload-server';
import { setupREST } from './legacy/upload';
import multer from 'multer';


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
    type Mutation {
        uploadMedia(url: String!): String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		hello: () => 'Hello world!',
	},
	Upload: { GraphQLUpload },
	Mutation: {
		async uploadMedia(obj, { file }) { },
	},
};

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(
	'/graphql',
	apolloUploadExpress(),
	multer
);

server.applyMiddleware({ app });

setupREST(app);


app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
