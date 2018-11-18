import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';
import { testSchema as typeDefs, resolvers } from '../..';
import { getTestContext } from '../../../utils/testUtils';

describe('Scripture', () => {
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
        scripture (query: "SNG.1.1") {
          id
          html
          reference
          copyright
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
