import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: JSON.parse(
      '{"__schema":{"types":[{"kind":"INTERFACE","name":"Node","possibleTypes":[{"name":"ContentChannel"},{"name":"UniversalContentItem"},{"name":"Person"}]},{"kind":"INTERFACE","name":"ContentItem","possibleTypes":[{"name":"UniversalContentItem"}]}]}}'
    ),
  }),
});

export default cache;
