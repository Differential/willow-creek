import React from 'react';

import PropTypes from 'prop-types';

import Like from 'apolloschurchapp/src/ui/Like';
import { Query, Mutation } from 'react-apollo';
import getSessionId from 'apolloschurchapp/src/store/getSessionId';

const LikeButton = ({ itemId, updateLikeEntity, getLikedContentItem }) => (
  <Query query={getSessionId} fetchPolicy="cache-only">
    {({ data: { sessionId } }) =>
      console.log(sessionId) || sessionId ? (
        <Query query={getLikedContentItem} variables={{ itemId }}>
          {({
            data: {
              node: { isLiked, ...node },
            },
          }) => (
            <Mutation
              mutation={updateLikeEntity}
              optimisticResponse={{
                updateLikeEntity: {
                  operation: isLiked ? 'Unlike' : 'Like',
                  id: null, // unknown at this time
                  interactionDateTime: new Date().toJSON(),
                  __typename: 'Interaction',
                },
              }}
              update={(
                cache,
                {
                  data: {
                    updateLikeEntity: { operation },
                  },
                }
              ) => {
                cache.writeQuery({
                  query: getLikedContentItem,
                  data: {
                    node: {
                      ...node,
                      isLiked: operation === 'Like',
                    },
                  },
                });
              }}
            >
              {(createNewInteraction) => (
                <Like
                  itemId={itemId}
                  sessionId={sessionId}
                  isLiked={isLiked}
                  operation={isLiked ? 'Unlike' : 'Like'}
                  toggleLike={async (variables) => {
                    try {
                      await createNewInteraction({ variables });
                    } catch (e) {
                      throw e.message;
                    }
                  }}
                />
              )}
            </Mutation>
          )}
        </Query>
      ) : null
    }
  </Query>
);

LikeButton.propTypes = {
  itemId: PropTypes.string,
  getLikedContentItem: PropTypes.shape({}),
  updateLikeEntity: PropTypes.shape({}),
};

export default LikeButton;
