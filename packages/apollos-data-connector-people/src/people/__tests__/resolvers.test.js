import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';
import { KeyValueCache } from 'apollo-server-caching';
import ApollosConfig from '@apollosproject/config';
import {
  createGlobalId,
  createApolloServerConfig,
} from '@apollosproject/server-core';
import {
  generateToken,
  registerToken,
} from '@apollosproject/data-connector-rock-auth';
import {
  testSchema,
  peopleSchema,
  mediaSchema,
  authSchema,
} from '@apollosproject/data-schema';
// we import the root-level schema and resolver so we test the entire integration:
import * as Person from '../index';
import authMock from '../../authMock';

const Auth = { schema: authSchema, dataSource: authMock };
const serverConfig = createApolloServerConfig({ Person, Auth });

const getTestContext = (req) => {
  const context = serverConfig.context(req);
  const dataSources = serverConfig.dataSources();
  // Apollo Server does this internally.
  Object.values(dataSources).forEach((dataSource) => {
    if (dataSource.initialize) {
      dataSource.initialize({ context, cache: KeyValueCache });
    }
  });
  context.dataSources = dataSources;
  return context;
};

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
});

describe('Person', () => {
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

  it("updates a user's attributes, if there is a current user", async () => {
    const query = `
      mutation {
        updateProfileField(input: { field: FirstName, value: "Richard" }) {
          firstName
          id
        }
      }
    `;
    const { userToken, rockCookie } = registerToken(
      generateToken({ cookie: 'some-cookie' })
    );
    context.userToken = userToken;
    context.rockCookie = rockCookie;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('updates multiple fields', async () => {
    const query = `
      mutation {
        updateProfileFields(input: [
          { field: FirstName, value: "Richard" },
          { field: LastName, value: "Walkerton" }
        ]) {
          firstName
          lastName
          id
        }
      }
    `;
    const { userToken, rockCookie } = registerToken(
      generateToken({ cookie: 'some-cookie' })
    );
    context.userToken = userToken;
    context.rockCookie = rockCookie;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it("fails to update a user's attributes, without a current user", async () => {
    const query = `
      mutation {
        updateProfileField(input: { field: FirstName, value: "Richard" }) {
          firstName
          id
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets people by an email', async () => {
    const query = `
      query {
        people(email: "isaac.hardy@newspring.cc") {
          id
          firstName
          lastName
          nickName
          email
          photo {
            uri
          }
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a single person when querying by root node', async () => {
    const query = `
      query {
        node(
          id: "${createGlobalId(51, 'Person')}"
        ) {
          ... on Person {
            id
            firstName
            lastName
            nickName
            email
            photo {
              uri
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
