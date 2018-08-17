import { withClientState } from 'apollo-link-state';

import { resolvers, defaults, schema } from 'apollos-church-app/src/store';

import cache from './cache';

export default withClientState({
  resolvers,
  defaults,
  cache,
  typeDefs: schema,
});
