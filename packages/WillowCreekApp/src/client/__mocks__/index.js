import { MockedProvider } from 'react-apollo/test-utils';
import ApolloClient from 'apollo-client';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import { ApolloLink } from 'apollo-link';
import { testSchema as typeDefs } from 'apollos-church-api';

import cache from '../cache';
import clientStateLink from '../clientStateLink';

export default MockedProvider;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
addMockFunctionsToSchema({ schema });

let link = new SchemaLink({ schema });
if (clientStateLink) {
  link = ApolloLink.from([clientStateLink, link]);
}

export const client = new ApolloClient({
  cache,
  link,
});
