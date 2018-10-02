import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import Icon from 'apolloschurchapp/src/ui/Icon';
import { withTheme } from 'apolloschurchapp/src/ui/theme';
import ProtectedTouchable from '../../auth/ProtectedTouchable';

const enhance = compose(
  pure,
  withTheme()
);

export const LikeIcon = enhance(({ isLiked, theme }) => (
  <Icon name={isLiked ? 'like-solid' : 'like'} fill={theme.colors.secondary} />
));

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

export default Like;
