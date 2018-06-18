import { graphql } from 'graphql';
import fetch from 'isomorphic-fetch';
import { makeExecutableSchema, gql } from 'apollo-server';

import { getContext } from '../../../';
// we import the root-level schema and resolver so we test the entire integration:
import { schema as typeDefs, resolvers } from '../../';

describe('Auth', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getContext();
  });

  it('logs in a user', async () => {
    const query = gql`
      mutation {
        authenticate(identity: "some-identity", password: "good") {
          user {
            id
            profile {
              id
            }
          }
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('throws invalid credentials error on bad password', async () => {
    const query = gql`
      mutation {
        authenticate(identity: "some-identity", password: "bad") {
          user {
            id
          }
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  describe('currentUser query', () => {
    const query = gql`
      query {
        currentUser {
          id
          profile {
            id
          }
        }
      }
    `;
    it('requires you to be logged in', async () => {
      const rootValue = {};

      const result = await graphql(schema, query, rootValue, context);
      expect(result).toMatchSnapshot();
    });

    it('queries current user when logged in', async () => {
      const rootValue = {};
      context.models.Auth.registerToken(
        context.models.Auth.generateToken({ cookie: 'some-cookie' })
      );
      const result = await graphql(schema, query, rootValue, context);
      expect(result).toMatchSnapshot();
    });
  });

  it('registers an auth token and passes the cookie on requests to rock', async () => {
    const token = context.models.Auth.generateToken({ cookie: 'some-cookie' });
    const secondContext = getContext({
      req: {
        headers: { authorization: token },
      },
    });
    const query = gql`
      query {
        currentUser {
          id
        }
      }
    `;
    const rootValue = {};
    await graphql(schema, query, rootValue, secondContext);
    expect(fetch.mock.calls[0][1]).toMatchSnapshot();
  });
});
