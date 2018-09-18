import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';

import { testSchema as typeDefs, resolvers } from 'apollos-church-api/src/data';
import { getTestContext } from 'apollos-church-api/src/utils/testUtils';
import { createGlobalId } from 'apollos-church-api/src/data/node/model';
import { generateToken } from 'apollos-church-api/src/data/auth/token';

describe('Interactions', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    const token = generateToken({ cookie: 'some-cookie' });
    context = getTestContext({
      req: {
        headers: { authorization: token },
      },
    });
  });

  it('creates a session', async () => {
    const query = `
      mutation createSession {
        createSession {
          id
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
  it('likes an entity', async () => {
    const query = `
      mutation likeEntity {
        updateLikeEntity(
          input: {
            nodeId: "${createGlobalId(1, 'UniversalContentItem')}"
            sessionId: "${createGlobalId(123, 'Session')}"
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
