import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { persistCache } from 'apollo-cache-persist';

import introspectionQueryResultData from './fragmentTypes.json';

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  }),
  cacheRedirects: {
    Query: {
      node: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: id.split(':')[0], id }),
    },
  },
});

export const ensureCacheHydration = (async () => {
  try {
    await persistCache({
      cache,
      storage: AsyncStorage,
      // trigger: 'background',
    });
  } catch (error) {
    console.error('Error restoring Apollo cache', error);
  }
})();

export default cache;
