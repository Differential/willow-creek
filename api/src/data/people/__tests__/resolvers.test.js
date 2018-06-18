import { graphql } from 'graphql';
import fetch from 'isomorphic-fetch';
import { makeExecutableSchema, gql } from 'apollo-server';

import { createGlobalId } from '../../node/model';
import { getContext } from '../../../';
// we import the root-level schema and resolver so we test the entire integration:
import { schema as typeDefs, resolvers } from '../../';

describe('Person', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getContext();
  });

  it('gets people by an email', async () => {
    const query = gql`
      query {
        people(email: "isaac.hardy@newspring.cc") {
          id
          firstName
          lastName
          nickName
          email
        }
      }
    `;
    const rootValue = {};

    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a single person when querying by root node', async () => {
    const query = gql`
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
          }
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
