import React from 'react';
import PropTypes from 'prop-types';

import { Icon, withTheme } from '@apollosproject/ui-kit';
import ProtectedTouchable from '../../auth/ProtectedTouchable';

const LikeIcon = withTheme(
  ({ theme: { colors: { secondary } = {} } = {}, isLiked } = {}) => ({
    name: isLiked ? 'like-solid' : 'like',
    fill: secondary,
  })
)(Icon);

LikeIcon.propTypes = {
  isLiked: PropTypes.bool,
};

const Like = ({ isLiked, toggleLike, itemId }) => (
  <ProtectedTouchable
    onPress={() =>
      toggleLike({ itemId, operation: isLiked ? 'Unlike' : 'Like' })
    }
  >
    <LikeIcon isLiked={isLiked} />
  </ProtectedTouchable>
);

Like.propTypes = {
  itemId: PropTypes.string,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export { Like as default, LikeIcon };
