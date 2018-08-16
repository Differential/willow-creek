import dotenv from 'dotenv/config'; // eslint-disable-line
import { ApolloServer } from 'apollo-server';
import { resolvers, schema } from './data';

import getContext from './getContext';
import getDataSources from './getDataSources';

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: getDataSources,
  context: getContext,
  formatError: (error) => {
    console.error(error.extensions.exception.stacktrace.join('\n'));
    return error;
  },
});
