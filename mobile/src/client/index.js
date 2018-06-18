import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';

import httpLink from './httpLink';

import cache from './cache';

const link = ApolloLink.from([httpLink]);

export default new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
});
