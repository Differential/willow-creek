import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import BackgroundView from '../BackgroundView';
import styled from '../styled';
import Icon from '../Icon';
import { withTheme } from '../theme';

const CloseIcon = withTheme(({ theme }) => ({
  name: 'close',
  fill: theme.colors.text.tertiary,
  size: theme.sizing.baseUnit,
}))(Icon);

const IconTouchable = styled(({ theme }) => ({
  position: 'absolute',
  top: theme.sizing.baseUnit * 1.5,
  right: theme.sizing.baseUnit * 1.5,
  width: theme.sizing.baseUnit * 1.75,
  height: theme.sizing.baseUnit * 1.75,
  borderRadius: theme.sizing.baseUnit * 1.75,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: theme.colors.text.primary,
  opacity: 0.9,
}))(TouchableOpacity);

const Container = styled({
  flex: null,
  width: '100%',
  height: '100%',
  borderRadius: 0,
})(BackgroundView);

const Handle = styled({
  // helps in swipe-to-close gesture
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 75,
})(View);

const ModalView = ({ navigation, onBack, children, ...props }) => (
  <Container {...props}>
    <StatusBar hidden />
    {children}
    <Handle />
    <IconTouchable onPress={() => (onBack ? onBack() : navigation.pop())}>
      <CloseIcon />
    </IconTouchable>
  </Container>
);

export default ModalView;
