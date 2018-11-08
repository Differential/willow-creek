import { ApolloServer } from 'apollo-server';

import { resolvers, schema, testSchema, context, dataSources } from './data';

export { resolvers, schema, testSchema };

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources,
  context,
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
