import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';

import { createGlobalId } from 'apollos-church-api/src/data/node/model';
import { getTestContext } from 'apollos-church-api/src/utils/testUtils';
import {
  generateToken,
  registerToken,
} from 'apollos-church-api/src/data/auth/token';
// we import the root-level schema and resolver so we test the entire integration:
import { testSchema as typeDefs, resolvers } from 'apollos-church-api/src/data';

describe('Person', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
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
