import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { kebabCase } from 'lodash';

import { withIsLoading } from 'ui/isLoading';
import { withTheme } from 'ui/theme';
import styled from 'ui/styled';
import { H7 } from 'ui/typography';
import Icon from 'ui/Icon';
import * as Icons from 'ui/Icon/icons';

const enhance = compose(withIsLoading, pure, withTheme());

const Wrapper = styled(({ flexed }) => ({
  flex: flexed ? 1 : null,
  flexDirection: 'row',
  alignItems: 'center',
}))(View);

const PlaceholderWrapper = styled(({ theme, withIcon }) => ({
  flex: 1,
  ...(withIcon
    ? { paddingHorizontal: theme.sizing.baseUnit / 2 }
    : { paddingRight: theme.sizing.baseUnit / 2 }),
}))(View);

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H7);

const ChannelLabel = enhance(({ label, icon, withFlex, isLoading, theme }) => (
  <Wrapper flexed={withFlex}>
    {icon ? (
      <Icon
        name={icon}
        size={theme.helpers.rem(1.2)}
        fill={theme.colors.text.secondary}
        isLoading={isLoading}
      />
    ) : null}
    <PlaceholderWrapper withIcon={icon}>
      <StyledH7>{label}</StyledH7>
    </PlaceholderWrapper>
  </Wrapper>
));

ChannelLabel.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(Object.keys(Icons).map(kebabCase)),
  isLoading: PropTypes.bool,
  withFlex: PropTypes.bool,
};

ChannelLabel.defaultProps = {
  withFlex: false,
};

export default ChannelLabel;
