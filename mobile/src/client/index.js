import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import httpLink from './httpLink';

const cache = new InMemoryCache();

const link = ApolloLink.from([httpLink]);

export default new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
});
