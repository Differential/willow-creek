import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose';

import { H6 } from 'ui/typography';
import styled from 'ui/styled';
import { withTheme } from 'ui/theme';
import GradientOverlayImage from 'ui/GradientOverlayImage';

const CardView = styled(
  ({ theme }) => ({
    borderRadius: theme.sizing.borderRadius,
    overflow: 'hidden',
  }),
  'TileImage'
)(View);

const Title = styled(
  ({ theme }) => ({
    position: 'absolute',
    bottom: theme.sizing.baseUnit,
    left: theme.sizing.baseUnit,
    backgroundColor: theme.colors.transparent,
    color: theme.colors.lightPrimary,
  }),
  'TileImage.Text'
)(H6);

const enhance = compose(
  withTheme(({ theme: { colors } = {} } = {}) => ({ theme: { colors } })),
  pure
);

const TileImage = enhance(({ image, link, onPressItem, text, theme }) => (
  <TouchableWithoutFeedback onPress={() => onPressItem({ ...link })}>
    <CardView>
      <GradientOverlayImage
        source={image}
        overlayColor={text ? theme.colors.black : null}
      />
      {text ? <Title>{text}</Title> : null}
    </CardView>
  </TouchableWithoutFeedback>
));

TileImage.propTypes = {
  image: GradientOverlayImage.propTypes.source,
  link: PropTypes.string.isRequired,
  onPressItem: PropTypes.func,
  text: PropTypes.string,
};

export default TileImage;
