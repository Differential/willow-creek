import { graphql } from 'graphql';
import { KeyValueCache } from 'apollo-server-caching';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';
import ApollosConfig from '@apollosproject/config';
import { createApolloServerConfig } from '@apollosproject/server-core';
import {
  peopleSchema,
  mediaSchema,
  testSchema,
} from '@apollosproject/data-schema';

import * as Auth from '../index';
import { generateToken, registerToken } from '../token';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
  },
});

const serverConfig = createApolloServerConfig({ Auth });

function getTestContext(req) {
  const testContext = serverConfig.context(req);
  const testDataSources = serverConfig.dataSources();
  // Apollo Server does this internally.
  Object.values(testDataSources).forEach((dataSource) => {
    if (dataSource.initialize) {
      dataSource.initialize({ context: testContext, cache: KeyValueCache });
    }
  });
  testContext.dataSources = testDataSources;
  return testContext;
}

describe('Auth', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = makeExecutableSchema({
      typeDefs: [...serverConfig.schema, peopleSchema, mediaSchema, testSchema],
      resolvers: serverConfig.resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    });
    context = getTestContext();
  });

  it('logs in a user', async () => {
    const query = `
      mutation {
        authenticate(identity: "some-identity", password: "good") {
          user {
            id
            profile {
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

  it('throws invalid credentials error on bad password', async () => {
    const query = `
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
    const query = `
      query {
        currentUser {
          id
          profile {
            email
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
      const token = generateToken({ cookie: 'some-cookie', sessionId: 123 });

      context = getTestContext({
        req: {
          headers: { authorization: token },
        },
      });

      const result = await graphql(schema, query, rootValue, context);
      expect(result).toMatchSnapshot();
    });

    it('logs a user out without a sessionId', async () => {
      const rootValue = {};
      const token = generateToken({ cookie: 'some-cookie' });
      context = getTestContext({
        req: {
          headers: { authorization: token },
        },
      });

      const result = await graphql(schema, query, rootValue, context);
      expect(result).toMatchSnapshot();
    });

    it('queries current user when logged in', async () => {
      const rootValue = {};
      try {
        const { userToken, rockCookie } = registerToken('asdfasdfasdf');
        context.userToken = userToken;
        context.rockCookie = rockCookie;

        await graphql(schema, query, rootValue, context);
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
    });
  });

  it('registers an auth token and passes the cookie on requests to rock', async () => {
    const token = generateToken({ cookie: 'some-cookie', sessionId: 123 });
    const secondContext = getTestContext({
      req: {
        headers: { authorization: token },
      },
    });
    const query = `
      query {
        currentUser {
          id
        }
      }
    `;
    const rootValue = {};
    await graphql(schema, query, rootValue, secondContext);
    expect(fetch.mock.calls[0][0].headers).toMatchSnapshot();
  });

  describe('Change Password', () => {
    it('throws error without a current user', async () => {
      try {
        await context.dataSources.Auth.changePassword({
          password: 'newPassword',
        });
      } catch (e) {
        expect(e.message).toEqual('Must be logged in');
      }
    });

    it('generates a new token', async () => {
      const { userToken, rockCookie } = registerToken(
        generateToken({ cookie: 'some-cookie' })
      );
      context.userToken = userToken;
      context.rockCookie = rockCookie;
      const {
        rockCookie: newCookie,
        token: newToken,
      } = await context.dataSources.Auth.changePassword({
        password: 'good',
      });
      expect(newCookie).toEqual('some cookie');
      expect(typeof newToken).toEqual('string');
    });
  });

  describe('User Registration', () => {
    it('checks if user is already registered', async () => {
      const result = await context.dataSources.Auth.personExists({
        identity: 'isaac.hardy@newspring.cc',
      });

      expect(result).toEqual(true);
    });

    it('throws error in personExists', async () => {
      const result = await context.dataSources.Auth.personExists({
        identity: 'fake',
      });

      expect(result).toEqual(false);
    });

    it('creates user profile', async () => {
      const result = await context.dataSources.Auth.createUserProfile({
        email: 'isaac.hardy@newspring.cc',
      });

      expect(result).toEqual('35');
    });

    it('throws error in createUserProfile', async () => {
      try {
        await context.dataSources.Auth.createUserProfile({
          email: '',
        });
      } catch (e) {
        expect(e.message).toEqual('Unable to create profile!');
      }
    });

    it('creates user login', async () => {
      const result = await context.dataSources.Auth.createUserLogin({
        email: 'isaac.hardy@newspring.cc',
        password: 'password',
        personId: 35,
      });

      expect(result).toEqual({ id: 21 });
    });

    it('throws error in createUserLogin', async () => {
      try {
        await context.dataSources.Auth.createUserLogin({
          email: '',
          password: 'password',
          personId: 35,
        });
      } catch (e) {
        expect(e.message).toEqual('Unable to create user login!');
      }
    });

    it('creates new registration', async () => {
      const query = `
        mutation {
          registerPerson(email: "hello.world@earth.org", password: "good") {
            user {
              id
              profile {
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

    it('passes the right args when creating a registration', async () => {
      const query = `
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

      const createUserProfile = jest
        .fn()
        .mockImplementation(async () => Promise.resolve('123'));
      const createUserLogin = jest.fn();
      const rootValue = {};

      context.dataSources.Auth.createUserLogin = createUserLogin;
      context.dataSources.Auth.createUserProfile = createUserProfile;

      await graphql(schema, query, rootValue, context);

      expect(createUserProfile.mock.calls).toMatchSnapshot();
      expect(createUserLogin.mock.calls).toMatchSnapshot();
    });
  });
});
