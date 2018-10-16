import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { startCase, toLower } from 'lodash';

import { withThemeMixin, withTheme } from 'apolloschurchapp/src/ui/theme';
import Icon from 'apolloschurchapp/src/ui/Icon';
import ChannelLabel from 'apolloschurchapp/src/ui/ChannelLabel';
import GradientOverlayImage from 'apolloschurchapp/src/ui/GradientOverlayImage';
import Card, { CardContent, CardActions } from 'apolloschurchapp/src/ui/Card';
import { H3 } from 'apolloschurchapp/src/ui/typography';
// import ConnectedImage from 'apolloschurchapp/src/ui/ConnectedImage';
// import ProgressiveImage from 'apolloschurchapp/src/ui/ProgressiveImage';

// import LikeButton from './LikeButton';

const enhance = compose(
  pure,
  withThemeMixin(({ isLight }) => ({
    type: isLight ? 'light' : 'dark',
  })),
  withTheme()
);

const FeedItemCard = enhance(
  ({
    images,
    title,
    channelType,
    channelTypeIcon,
    isLoading,
    isLight,
    isLiked,
    backgroundColor,
    theme,
    transitionKey,
    id,
    ...otherProps
  }) => (
    <Card isLoading={isLoading} cardColor={backgroundColor} {...otherProps}>
      <GradientOverlayImage
        isLoading={isLoading}
        source={images}
        overlayColor={backgroundColor}
      />
      <CardContent>
        <H3 isLoading={isLoading}>{title}</H3>
      </CardContent>
      <CardActions>
        <ChannelLabel
          label={startCase(toLower(channelType))}
          icon={channelTypeIcon}
          isLoading={isLoading}
          withFlex
        />
        <Icon
          name={isLiked ? 'like-solid' : 'like'}
          size={theme.helpers.rem(1.2)}
          fill={theme.colors.text.primary}
          isLoading={isLoading}
        />
      </CardActions>
    </Card>
  )
);

const sourcePropType = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
    })
  ),
  PropTypes.string,
]);

FeedItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  images: sourcePropType,
  channelType: PropTypes.string,
  channelTypeIcon: PropTypes.string,
  isLoading: PropTypes.bool,
  isLiked: PropTypes.bool,
  isLight: PropTypes.bool,
  backgroundColor: PropTypes.string,
  style: PropTypes.any, // eslint-disable-line
};

FeedItemCard.defaultProps = {
  isLight: true,
  channelTypeIcon: null,
};

export default FeedItemCard;
