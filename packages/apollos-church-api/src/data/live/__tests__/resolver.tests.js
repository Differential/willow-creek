import { fetch } from 'apollo-server-env';

import { graphql } from 'graphql';
import { makeExecutableSchema } from 'apollo-server';
import { testSchema as typeDefs, resolvers } from '../..';
import { getTestContext } from '../../../utils/testUtils';
// we import the root-level schema and resolver so we test the entire integration:

describe('LiveStream', () => {
  let schema;
  let context;
  beforeEach(() => {
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getTestContext();

    fetch.resetMocks();
    fetch.mockLiveDataSourceApis();
  });

  it('returns', async () => {
    const query = `
      query {
        liveStream {
          isLive
          eventStartTime
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
