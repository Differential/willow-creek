import { graphql } from 'graphql';
import fetch from 'isomorphic-fetch';
import { makeExecutableSchema } from 'apollo-server';
import { getTestContext } from '/api/utils/testUtils';

import { schema as typeDefs, resolvers } from '../../';

describe('LiveStream', () => {
  let schema;
  let context;
  beforeEach(() => {
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getTestContext();

    fetch.resetMocks();
    fetch.mockDataSourceApis();
  });

  it('returns', async () => {
    const query = `
      query {
        scripture (query: "John1.1") {
          html
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
