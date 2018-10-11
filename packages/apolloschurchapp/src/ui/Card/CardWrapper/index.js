import { compose, pure } from 'recompose';
import React from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';

import { withIsLoading } from 'apolloschurchapp/src/ui/isLoading';
import styled from 'apolloschurchapp/src/ui/styled';

const StyledCard = compose(
  withIsLoading,
  styled(({ theme, cardColor, inHorizontalList = false }) => ({
    // card styles
    backgroundColor: cardColor || theme.colors.background.paper,
    borderRadius: theme.sizing.baseUnit,
    ...(inHorizontalList
      ? {
          marginLeft: theme.sizing.baseUnit * 0.5,
          marginRight: 0,
        }
      : {
          marginHorizontal: theme.sizing.baseUnit,
          marginVertical: theme.sizing.baseUnit * 0.75,
        }),
    ...Platform.select(theme.shadows.default),
  }))
)(View);

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so overflow must
 * live on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  borderRadius: theme.sizing.baseUnit,
  overflow: 'hidden',
}))(View);

const Card = pure(({ children, isLoading, ...otherProps }) => (
  <StyledCard {...otherProps}>
    <OverflowFix>{children}</OverflowFix>
  </StyledCard>
));

Card.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.any, // eslint-disable-line
};

export default Card;
