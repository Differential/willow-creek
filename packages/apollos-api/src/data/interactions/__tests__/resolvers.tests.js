import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';
import ApollosConfig from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';

import { generateToken } from '@apollosproject/data-connector-rock-auth';
import { getTestContext } from '../../../utils/testUtils';
import { testSchema as typeDefs, resolvers } from '../..';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
  ROCK_MAPPINGS: {
    SERIES_CONTENT_CHANNEL_TYPE_IDS: [6, 7],
  },
});

describe('Interactions', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    const token = generateToken({ cookie: 'some-cookie', sessionId: 123 });
    context = getTestContext({
      req: {
        headers: { authorization: token },
      },
    });
  });

  it('likes an entity', async () => {
    const query = `
      mutation likeEntity {
        updateLikeEntity(
          input: {
            nodeId: "${createGlobalId(1, 'UniversalContentItem')}"
            operation: Like
          }
        ) {
          id
          operation
          interactionDateTime
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
  it('uses interactions to track if a user liked content', async () => {
    const query = `
      query getContent {
        node(id: "${createGlobalId(1, 'UniversalContentItem')}") {
          id
          ... on UniversalContentItem {
            isLiked
          }
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets all user liked content', async () => {
    const query = `
      query {
        getAllLikedContent {
          id
          title
          isLiked
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('returns an empty array for liked content without a user logged in', async () => {
    const query = `
      query {
        getAllLikedContent {
          id
          title
          isLiked
        }
      }
    `;
    const contextWithoutUser = getTestContext();
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, contextWithoutUser);
    expect(result).toMatchSnapshot();
  });
});
