import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import { makeExecutableSchema } from 'apollo-server';

import ApollosConfig from '@apolloschurch/config';
import { testSchema as typeDefs, resolvers } from '../..';
import { resolver } from '..';
import { getTestContext } from '../../../utils/testUtils';
// we import the root-level schema and resolver so we test the entire integration:
import { createGlobalId } from '../../node/model';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
  ROCK_CONSTANTS: {
    IMAGE: 10,
    AUDIO_FILE: 77,
    VIDEO_FILE: 79,
  },
});

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
      __typename # Typenames here to increase test coverage
      name
      key
      sources {
        __typename
        uri
      }
    }
    videos {
      __typename
      name
      key
      sources {
        __typename
        uri
      }
      embedHtml
    }
    audios {
      __typename
      name
      key
      sources {
        __typename
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
      pageInfo {
        startCursor
        endCursor
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
    sharing {
      __typename
      url
      title
      message
    }
  }
`;

describe('UniversalContentItem', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = makeExecutableSchema({ typeDefs, resolvers });
    context = getTestContext();
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

  it('gets a devotional item', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(123, 'DevotionalContentItem')}") {
          id
          ... on DevotionalContentItem {
            id
            title
            scriptures {
              html
            }
          }
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it("gets a content item and it's siblings", async () => {
    const query = `
      query {
        userFeed {
          edges {
            node {
              ...ContentItemFragment
              ... on UniversalContentItem {
                siblingContentItemsConnection {
                        edges {
                    node {
                      id
                      __typename
                    }
                    cursor
                  }
                }
              }
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

const { ContentItemsConnection } = resolver;

describe('ContentItemsConnection resolvee', () => {
  it('builds a pageInfo object with items', async () => {
    const edges = Promise.resolve([
      { cursor: `item-0` },
      { cursor: `item-1` },
      { cursor: `item-2` },
    ]);
    const { startCursor, endCursor } = await ContentItemsConnection.pageInfo({
      edges,
    });

    expect(startCursor).toEqual('item-0');
    expect(endCursor).toEqual('item-2');
  });
  it('builds a pageInfo object without items', async () => {
    const edges = [];
    const { startCursor, endCursor } = await ContentItemsConnection.pageInfo({
      edges,
    });

    expect(startCursor).toEqual(null);
    expect(endCursor).toEqual(null);
  });
});
