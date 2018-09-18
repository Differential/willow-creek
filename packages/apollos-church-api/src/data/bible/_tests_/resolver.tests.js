import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';
import { getTestContext } from 'apollos-church-api/src/utils/testUtils';

import { testSchema as typeDefs, resolvers } from 'apollos-church-api/src/data';

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
          html
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
