import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import Icon from 'apolloschurchapp/src/ui/Icon';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import { withTheme } from 'apolloschurchapp/src/ui/theme';

const enhance = compose(
  pure,
  withTheme()
);

const Like = enhance(
  ({ isLiked, toggleLike, itemId, sessionId, operation, theme }) => (
    <Touchable onPress={() => toggleLike({ itemId, sessionId, operation })}>
      <Icon
        name={isLiked ? 'like-solid' : 'like'}
        fill={theme.colors.secondary}
      />
    </Touchable>
  )
);

Like.propTypes = {
  id: PropTypes.string,
  isLike: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export default Like;
