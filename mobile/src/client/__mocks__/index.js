import { MockedProvider } from 'react-apollo/test-utils';
import ApolloClient from 'apollo-client';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import cache from '../cache';

import clientStateLink from '../clientStateLink';
import { ApolloLink } from 'apollo-link';

// App refers to '../../../../api/src'
// See config in .babelrc
// eslint-disable-next-line import/no-absolute-path
import { schema as typeDefs } from '/api/data';

export default MockedProvider;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const link = ApolloLink.from([clientStateLink, new SchemaLink({ schema })]);

export const client = new ApolloClient({
  cache,
  link,
});
