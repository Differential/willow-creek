import dotenv from 'dotenv/config'; // eslint-disable-line
import { ApolloServer } from 'apollo-server';
import { resolvers, schema, testSchema } from './data';

import getContext from './getContext';
import getDataSources from './getDataSources';

export { resolvers, schema, testSchema };

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: getDataSources,
  context: getContext,
  introspection: true,
  formatError: (error) => {
    console.error(error.extensions.exception.stacktrace.join('\n'));
    return error;
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line',
    },
  },
});
