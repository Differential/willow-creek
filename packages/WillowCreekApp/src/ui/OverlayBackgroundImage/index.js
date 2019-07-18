import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ConnectedImage, styled } from '@apollosproject/ui-kit';

const DeviceWindow = Dimensions.get('window');

const Image = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  opacity: 1 - theme.alpha.high,
}))(ConnectedImage);

const ImageContainer = styled(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  overflow: 'hidden',
  backgroundColor: theme.colors.secondary,

  // the following values were determined by the precise & scientific
  // method of guess and check.
  height: '40%',
  left: '30%',
  right: '30%',
}))(View);

const ClippingMask = styled(({ containerWidth }) => ({
  overflow: 'hidden',
  position: 'absolute',

  // the following values were determined by the precise & scientific
  // method of guess and check.
  borderRadius: containerWidth * 1.5,
  top: '-150%',
  left: '-75%',
  right: '-75%',
  bottom: 0,
}))(View);

const SizingContainer = styled({
  width: '100%',
  aspectRatio: 1,
})(View);

const OverlayBackgroundImage = ({ ...props }) => {
  const [layoutState, setLayout] = useState({
    width: DeviceWindow.width,
    height: DeviceWindow.width,
  });

  return (
    <SizingContainer
      onLayout={({ nativeEvent: { layout } = {} }) => setLayout(layout)}
    >
      <ClippingMask containerWidth={layoutState.width}>
        <ImageContainer>
          <Image {...props} />
        </ImageContainer>
      </ClippingMask>
    </SizingContainer>
  );
};

export default OverlayBackgroundImage;
