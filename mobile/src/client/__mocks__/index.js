import { MockedProvider } from 'react-apollo/test-utils';
import ApolloClient from 'apollo-client';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';

// App refers to '../../../../api/src'
// See config in .babelrc
// eslint-disable-next-line import/no-absolute-path
import { schema as typeDefs } from '/api/data';

export default MockedProvider;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const apolloCache = new InMemoryCache();

export const client = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema }),
});
