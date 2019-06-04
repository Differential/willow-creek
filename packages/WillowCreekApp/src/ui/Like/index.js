import React from 'react';
import PropTypes from 'prop-types';

import { Icon, withTheme } from '@apollosproject/ui-kit';
import { ProtectedTouchable } from '@apollosproject/ui-auth';

import { withNavigation } from 'react-navigation';

const LikeIcon = withTheme(
  ({
    theme: {
      colors: { text: { primary } },
      sizing: { baseUnit },
    }, isLiked } = {}) => ({
    name: isLiked ? 'like-solid' : 'like',
    fill: primary,
    size: baseUnit * 1.5,
  })
)(Icon);

LikeIcon.propTypes = {
  isLiked: PropTypes.bool,
};

const Like = withNavigation(({ isLiked, toggleLike, itemId }) => (
  <ProtectedTouchable
    onPress={() =>
      toggleLike({ itemId, operation: isLiked ? 'Unlike' : 'Like' })
    }
  >
    <LikeIcon isLiked={isLiked} />
  </ProtectedTouchable>
));

Like.propTypes = {
  itemId: PropTypes.string,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export { Like as default, LikeIcon };
