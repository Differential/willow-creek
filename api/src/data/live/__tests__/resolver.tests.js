import { graphql } from 'graphql';
import fetch from 'isomorphic-fetch';
import { makeExecutableSchema, gql } from 'apollo-server';

import { getContext } from '../../../';
// we import the root-level schema and resolver so we test the entire integration:
import { schema as typeDefs, resolvers } from '../../';

describe('LiveStream', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getContext();
  });

  it('returns', async () => {
    const query = gql`
      query {
        liveStream {
          isLiveNow
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
