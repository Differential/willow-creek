import React from 'react';
import renderer from 'react-test-renderer';
// import { MockProvider } from 'react-apollo/test-utils';
import Providers from 'apolloschurchapp/src/Providers';
import gql from 'graphql-tag';
import { client } from 'apolloschurchapp/src/client';
import LikeButton from '.';

const defaults = {
  sessionId: 'asjdflakjds;flj',
};

describe('the LikeButton component', () => {
  beforeEach(() => {
    client.writeData({ data: defaults });
  });

  it('should render', () => {
    const getSessionId = {
      request: {
        query: gql`
          query sessionId {
            sessionId @client
          }
        `,
      },
      result: {
        data: {
          sessionId: 'asdf',
        },
      },
    };

    const updateLikeEntity = {
      request: {
        query: gql`
          mutation updateLikeEntity(
            $itemId: ID!
            $sessionId: ID!
            $operation: LIKE_OPERATION!
          ) {
            updateLikeEntity(
              input: {
                nodeId: $itemId
                sessionId: $sessionId
                operation: $operation
              }
            ) {
              id
              operation
              interactionDateTime
            }
          }
        `,
        variables: {
          itemId: 'asdf',
          sessionId: '123',
          operation: 'Like',
        },
      },
      result: {
        data: {
          node: { isLiked: true },
        },
      },
    };

    const getLikedContentItem = {
      request: {
        query: gql`
          query getLikedContentItem($itemId: ID!) {
            node(id: $itemId) {
              ... on ContentItem {
                id
                isLiked
              }
            }
          }
        `,
        variables: {
          itemId: 'asdf',
        },
      },
      result: {
        data: {
          updateLikeEntity: { operation: 'Like' },
        },
      },
    };

    const tree = renderer.create(
      <Providers mocks={[getSessionId, updateLikeEntity, getLikedContentItem]}>
        <LikeButton
          itemId={'asdf'}
          updateLikeEntity={updateLikeEntity}
          getLikedContentItem={getLikedContentItem}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
