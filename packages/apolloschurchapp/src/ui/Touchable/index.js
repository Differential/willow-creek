import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { defaultProps } from 'recompose';

import styled from 'apolloschurchapp/src/ui/styled';
import { withTheme } from 'apolloschurchapp/src/ui/theme';

const AndroidRippleWrapper = styled(({ borderRadius }) => ({
  borderRadius,
  overflow: 'hidden',
}))(View);

const AndroidWrapper = (
  { borderRadius, children } // eslint-disable-line react/prop-types
) =>
  Platform.OS === 'android' ? (
    <AndroidRippleWrapper borderRadius={borderRadius} round>
      {children}
    </AndroidRippleWrapper>
  ) : (
    children
  );

// Set a platform specific component
const PlatformTouchable =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

// Set some platform specific default props
const PlatformTouchableWithDefaultProps =
  Platform.OS === 'ios'
    ? defaultProps({ activeOpacity: 0.5 })(PlatformTouchable)
    : withTheme(({ theme }) => ({
        borderRadius: 0,
        background: TouchableNativeFeedback.Ripple(
          theme.colors.text.primary,
          false
        ),
      }))(PlatformTouchable);

const Touchable = ({ borderRadius, children, ...otherProps }) => (
  <AndroidWrapper borderRadius={borderRadius}>
    <PlatformTouchableWithDefaultProps {...otherProps}>
      {children}
    </PlatformTouchableWithDefaultProps>
  </AndroidWrapper>
);

Touchable.propTypes = {
  borderRadius: PropTypes.number,
  children: PropTypes.element,
};

export default Touchable;
