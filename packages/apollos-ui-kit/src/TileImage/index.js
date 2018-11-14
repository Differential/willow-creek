import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose';

import { H4 } from '../typography';
import styled from '../styled';
import { withTheme } from '../theme';
import GradientOverlayImage from '../GradientOverlayImage';
import TouchableScale from '../TouchableScale';

const CardView = styled(
  ({ theme }) => ({
    borderRadius: theme.sizing.baseUnit,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  }),
  'TileImage'
)(View);

const Title = styled(
  ({ theme }) => ({
    position: 'absolute',
    bottom: theme.sizing.baseUnit,
    left: theme.sizing.baseUnit,
    right: theme.sizing.baseUnit,
    backgroundColor: theme.colors.transparent,
    color: theme.colors.lightPrimary,
  }),
  'TileImage.Text'
)(H4);

const SquareGradientOverlayImage = styled({
  aspectRatio: 1,
})(GradientOverlayImage);

const enhance = compose(
  withTheme(({ theme: { colors } = {} } = {}) => ({ theme: { colors } })),
  pure
);

const TileImage = enhance(
  ({ image, link, onPressItem, text, theme, isLoading }) => (
    <TouchableScale onPress={() => !isLoading && onPressItem({ ...link })}>
      <CardView>
        <SquareGradientOverlayImage
          source={image}
          isLoading={isLoading}
          maintainAspectRatio={false}
          overlayColor={text ? theme.colors.black : null}
        />
        <Title isLoading={isLoading}>{text}</Title>
      </CardView>
    </TouchableScale>
  )
);

TileImage.propTypes = {
  image: GradientOverlayImage.propTypes.source,
  link: PropTypes.string,
  onPressItem: PropTypes.func,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
};

TileImage.defaultProps = {
  text: '',
};

export default TileImage;
