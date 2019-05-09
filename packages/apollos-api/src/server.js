import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { RockLoggingExtension } from '@apollosproject/rock-apollo-data-source';

import {
  resolvers,
  schema,
  testSchema,
  context,
  dataSources,
  applyServerMiddleware,
} from './data';

export { resolvers, schema, testSchema };

const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

const extensions = isDev ? [() => new RockLoggingExtension()] : [];

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources,
  context,
  introspection: true,
  extensions,
  formatError: (error) => {
    console.error(error.extensions.exception.stacktrace.join('\n'));
    return error;
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line',
    },
  },
  cacheControl: {
    stripFormattedExtensions: false,
    calculateHttpHeaders: true,
    defaultMaxAge: 600,
  },
});

const app = express();

applyServerMiddleware({ app, dataSources, context });
apolloServer.applyMiddleware({ app });
apolloServer.applyMiddleware({ app, path: '/' });

export default app;
