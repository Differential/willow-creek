import React from 'react';
import { View } from 'react-native';

import styled from '../styled';
import { LayoutConsumer } from '../LayoutContext';

const InnerView = styled(({ safeAreaInsets, isFullscreen = false, theme }) => ({
  marginBottom: isFullscreen
    ? 0
    : Math.max(theme.sizing.baseUnit, safeAreaInsets.bottom * 0.75),
}))(View);

const MediaPlayerSafeLayout = (props) => (
  <LayoutConsumer>
    {({ safeAreaInsets }) => (
      <InnerView safeAreaInsets={safeAreaInsets} {...props} />
    )}
  </LayoutConsumer>
);

export default MediaPlayerSafeLayout;
