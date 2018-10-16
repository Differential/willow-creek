import React from 'react';

import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Query, Mutation } from 'react-apollo';

import Like from 'apolloschurchapp/src/ui/Like';
import { track, events } from 'apolloschurchapp/src/analytics';

import updateLikeEntity from './updateLikeEntity';
import getLikedContentItem from './getLikedContentItem';

const GetLikeData = ({ itemId, children }) => (
  <Query query={getLikedContentItem} variables={{ itemId }}>
    {({ data: { node = {} } = {}, loading }) => {
      const isLiked = loading ? false : get(node, 'isLiked') || false;
      return children({ isLiked, item: node });
    }}
  </Query>
);

GetLikeData.propTypes = {
  itemId: PropTypes.string,
  children: PropTypes.func.isRequired,
};

const UpdateLikeStatus = ({ itemId, item, isLiked, children }) => (
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
    refetchQueries={['getAllLikedContent']}
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
            ...item,
            isLiked: operation === 'Like',
          },
        },
      });
    }}
  >
    {(createNewInteraction) =>
      itemId
        ? children({
            itemId,
            isLiked,
            toggleLike: async (variables) => {
              try {
                await createNewInteraction({ variables });
                track({
                  eventName: isLiked
                    ? events.UnlikeContent
                    : events.LikeContent,
                  properties: {
                    id: itemId,
                  },
                });
              } catch (e) {
                throw e.message;
              }
            },
          })
        : null
    }
  </Mutation>
);

UpdateLikeStatus.propTypes = {
  itemId: PropTypes.string,
  children: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    __typename: PropTypes.string,
    isLiked: PropTypes.bool,
  }),
};

const LikeButton = ({ itemId }) => (
  <GetLikeData itemId={itemId}>
    {({ isLiked, item }) => (
      <UpdateLikeStatus itemId={itemId} item={item} isLiked={isLiked}>
        {({ toggleLike, isLiked: newLikeValue }) => (
          <Like
            itemId={itemId}
            isLiked={newLikeValue}
            toggleLike={toggleLike}
          />
        )}
      </UpdateLikeStatus>
    )}
  </GetLikeData>
);

LikeButton.propTypes = {
  itemId: PropTypes.string,
};

export default LikeButton;
