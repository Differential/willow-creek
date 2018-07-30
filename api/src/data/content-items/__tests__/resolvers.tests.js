import { graphql } from 'graphql';
import fetch from 'isomorphic-fetch';
import { makeExecutableSchema } from 'apollo-server';

import { createGlobalId } from '../../node/model';
import getContext from '../../../getContext';
// we import the root-level schema and resolver so we test the entire integration:
import { schema as typeDefs, resolvers } from '../../';

const contentItemFragment = `
  fragment ContentItemFragment on UniversalContentItem {
    id
    __typename
    title
    coverImage {
      name
      key
      sources {
        uri
      }
    }
    images {
      name
      key
      sources {
        uri
      }
    }
    videos {
      name
      key
      sources {
        uri
      }
      embedHtml
    }
    audios {
      name
      key
      sources {
        uri
      }
    }
    htmlContent
    childContentItemsConnection {
      edges {
        node {
          id
          __typename
        }
        cursor
      }
    }
    parentChannel {
      id
      __typename
    }
    terms {
      key
      value
    }
  }
`;

describe('UniversalContentItem', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getContext();
  });

  it('gets a user feed', async () => {
    const query = `
      query {
        userFeed {
          edges {
            node {
              ...ContentItemFragment
            }
          }
        }
      }
      ${contentItemFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a content item', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(1, 'UniversalContentItem')}") {
          ...ContentItemFragment
        }
      }
      ${contentItemFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('properly handles empty attribute values', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(
          'test-case-no-attributes',
          'UniversalContentItem'
        )}") {
          ...ContentItemFragment
        }
      }
      ${contentItemFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('filters terms by a match string', async () => {
    const query = `
    query {
      node(id: "${createGlobalId(1, 'UniversalContentItem')}") {
        ...on UniversalContentItem {
          terms(match: "speaker") {
            value
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
