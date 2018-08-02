import { graphql } from 'graphql';
import fetch from 'isomorphic-fetch';
import { makeExecutableSchema } from 'apollo-server';
import getContext from '/api/getContext';
// we import the root-level schema and resolver so we test the entire integration:
import { schema as typeDefs, resolvers } from '/api/data';

import { createGlobalId } from '/api/data/node/model';

const contentChannelFragment = `
  fragment ContentChannelFragment on ContentChannel {
    id
    __typename
    name
    description
    childContentChannels {
      id
      __typename
      name
      description
    }
    childContentItemsConnection {
      edges {
        cursor
        node {
          id
          __typename
        }
      }
    }
  }
`;

describe('ContentChannel', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getContext();
  });

  it('gets a list of content channels', async () => {
    const query = `
      query {
        contentChannels {
          ...ContentChannelFragment
        }
      }
      ${contentChannelFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a single content channel when querying by root node', async () => {
    const query = `
      query {
        node(
          id: "${createGlobalId(1, 'ContentChannel')}"
        ) {
          ...on ContentChannel {
            ...ContentChannelFragment
          }
        }
      }
      ${contentChannelFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
