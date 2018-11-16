import { KeyValueCache } from 'apollo-server-caching';
import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';

import ApollosConfig from '@apollosproject/config';
import { generateToken } from '@apollosproject/data-connector-rock-auth';
import {
  testSchema,
  peopleSchema,
  mediaSchema,
  authSchema,
} from '@apollosproject/data-schema';
import { createApolloServerConfig } from '@apollosproject/server-core';
import { Person, Family } from '../..';
// we import the root-level schema and resolver so we test the entire integration:
import authMock from '../../authMock';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
});

const Auth = {
  schema: authSchema,
  dataSource: authMock,
  resolver: { Query: { currentUser: () => ({ profile: { id: 51 } }) } },
};

const serverConfig = createApolloServerConfig({ Family, Person, Auth });

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

describe('Family', () => {
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
    const token = generateToken({
      cookie: 'some-cookie',
      sessionId: 'somessessionid',
    });
    context = getTestContext({ req: { headers: { authorization: token } } });
  });

  it("returns a user's location", async () => {
    const query = `
      query {
        currentUser {
          profile {
            location
          }
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
