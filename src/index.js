
import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { uploaderService } from './rest/uploader';
import resolvers from './resolvers/resolvers';
import { protectedEndpoints } from './modules/auth';
import { deployService } from './rest/deploy';

const db = new Prisma({
	typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
	endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
	debug: true, // log all GraphQL queries & mutations sent to the Prisma API
	// secret: process.env.PRISMA_SECRET,
	// only needed if specified in `database/prisma.yml` (value set in `.env`)
});

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	endpoint: process.env.GRAPHQL_ENDPOINT,
	middlewares: [protectedEndpoints],
	context: req => ({ ...req, db }),
});

uploaderService(server.express);
deployService(server.express);
server.start({ port: process.env.SERVER_PORT }, () => {
	console.log('Server started');
	console.log('Server is running on http://localhost:4000');
});
