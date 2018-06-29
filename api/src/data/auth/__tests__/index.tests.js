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

    it('queries current user when logged in', async () => {
      const rootValue = {};
      try {
        context.models.Auth.registerToken('asdfasdfasdf');
        await graphql(schema, query, rootValue, context);
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
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

  describe('User Registration', () => {
    it('checks if user is already registered', async () => {
      const result = await context.models.Auth.personExists({
        identity: 'isaac.hardy@newspring.cc',
      });

      expect(result).toEqual(true);
    });

    it('throws error in personExists', async () => {
      const result = await context.models.Auth.personExists({
        identity: 'fake',
      });

      expect(result).toEqual(false);
    });

    it('creates user profile', async () => {
      const result = await context.models.Auth.createUserProfile({
        email: 'isaac.hardy@newspring.cc',
      });

      expect(result).toEqual({ personId: 35 });
    });

    it('throws error in createUserProfile', async () => {
      try {
        await context.models.Auth.createUserProfile({
          email: '',
        });
      } catch (e) {
        expect(e.message).toEqual('Unable to create profile!');
      }
    });

    it('creates user login', async () => {
      const result = await context.models.Auth.createUserLogin({
        email: 'isaac.hardy@newspring.cc',
        password: 'password',
        personId: 35,
      });

      expect(result).toEqual({ id: 21 });
    });

    it('throws error in createUserLogin', async () => {
      try {
        await context.models.Auth.createUserLogin({
          email: '',
          password: 'password',
          personId: 35,
        });
      } catch (e) {
        expect(e.message).toEqual('Unable to create user login!');
      }
    });

    it('creates new registration', async () => {
      const query = gql`
        mutation {
          registerPerson(email: "hello.world@earth.org", password: "good") {
            user {
              id
              profile {
                id
                email
              }
            }
          }
        }
      `;

      const rootValue = {};

      const result = await graphql(schema, query, rootValue, context);
      expect(result).toMatchSnapshot();
    });
  });
});
