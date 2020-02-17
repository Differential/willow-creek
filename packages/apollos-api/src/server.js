import { ApolloServer } from 'apollo-server-express';
import ApollosConfig from '@apollosproject/config';
import express from 'express';
import { RockLoggingExtension } from '@apollosproject/rock-apollo-data-source';
import { get } from 'lodash';
import { setupUniversalLinks } from './universal-links';

import {
  resolvers,
  schema,
  testSchema,
  context,
  dataSources,
  applyServerMiddleware,
  setupJobs,
} from './data';
import { report } from './data/bugsnag';

export { resolvers, schema, testSchema };

const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

const extensions = isDev ? [() => new RockLoggingExtension()] : [];

const cacheOptions = isDev
  ? {}
  : {
      cacheControl: {
        stripFormattedExtensions: false,
        calculateHttpHeaders: true,
        defaultMaxAge: 3600,
      },
    };

const { ENGINE } = ApollosConfig;

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources,
  context: ({ req, res, ...args }) => {
    res.set('Vary', 'X-Campus');
    return context({ req, res, ...args });
  },
  introspection: true,
  extensions,
  debug: true,
  formatError: (error) => {
    report(
      error,
      {
        'GraphQL Info': { path: error.path },
        'Custom Stacktrace': {
          trace: get(error, 'extensions.exception.stacktrace', []).join('\n'),
        },
        'Auth Error Info': get(error, 'extensions.exception.userContext'),
      },
      (err) => {
        err.errorClass = error.message;
      }
    );
    if (get(error, 'extensions.exception.stacktrace')) {
      delete error.extensions.exception.stacktrace;
    }
    if (get(error, 'extensions.exception.userContext')) {
      delete error.extensions.exception.userContext;
    }
    return error;
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line',
    },
  },
  ...cacheOptions,
  engine: {
    apiKey: ENGINE.API_KEY,
    schemaTag: ENGINE.SCHEMA_TAG,
  },
});

const app = express();

applyServerMiddleware({ app, dataSources, context });
setupJobs({ app, dataSources, context });
setupUniversalLinks({ app });

apolloServer.applyMiddleware({ app });
apolloServer.applyMiddleware({ app, path: '/' });

export default app;
