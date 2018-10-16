import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';

import { testSchema as typeDefs, resolvers } from '../..';
import { generateToken } from '../../auth/token';
// we import the root-level schema and resolver so we test the entire integration:
import { getTestContext } from '../../../utils/testUtils';

describe('Person', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    const token = generateToken({
      cookie: 'some-cookie',
      sessionId: 'somessessionid',
    });
    context = getTestContext({ req: { headers: { authorization: token } } });
  });

  it("returns a user's location", async () => {
    const query = `
      query {
        currentUser {
          profile {
            location
          }
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
