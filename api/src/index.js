import dotenv from 'dotenv/config'; // eslint-disable-line
import { ApolloServer } from 'apollo-server';
import { resolvers, schema, dataSources } from './data';

import getContext from './getContext';

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({ liveStream: new dataSources.LiveStream() }),
  context: getContext,
  formatError: (error) => {
    console.error(error.extensions.exception.stacktrace.join('\n'));
    return error;
  },
});
