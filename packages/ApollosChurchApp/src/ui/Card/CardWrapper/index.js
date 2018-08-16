import { compose, pure } from 'recompose';
import React from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';

import { withIsLoading } from '/mobile/ui/isLoading';
import styled from '/mobile/ui/styled';
import { enhancer as mediaQuery } from '/mobile/ui/MediaQuery';

const StyledCard = compose(
  withIsLoading,
  styled(({ theme, cardColor }) => ({
    // card styles
    backgroundColor: cardColor || theme.colors.background.paper,
    borderRadius: theme.sizing.borderRadius,
    ...Platform.select(theme.shadows.default),
  })),
  mediaQuery(
    // responsive styles
    ({ md }) => ({ maxWidth: md }),
    styled(({ theme }) => ({
      // mobile
      marginHorizontal: theme.sizing.baseUnit / 2,
      marginVertical: theme.sizing.baseUnit / 4,
    })),
    styled(({ theme }) => ({
      // tablet
      marginHorizontal: theme.sizing.baseUnit,
      marginVertical: theme.sizing.baseUnit / 4,
    }))
  )
)(View);

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so overflow must
 * live on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  borderRadius: theme.sizing.borderRadius,
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
