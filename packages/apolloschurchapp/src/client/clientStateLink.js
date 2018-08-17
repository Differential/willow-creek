import { withClientState } from 'apollo-link-state';

import { resolvers, defaults, schema } from 'apolloschurchapp/src/store';

import cache from './cache';

export default withClientState({
  resolvers,
  defaults,
  cache,
  typeDefs: schema,
});
