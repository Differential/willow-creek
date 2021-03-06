import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ConnectedImage, styled } from '@apollosproject/ui-kit';

const DeviceWindow = Dimensions.get('window');

const Image = styled({
  ...StyleSheet.absoluteFillObject,
  opacity: 0.025,
})(ConnectedImage);

const ImageContainer = styled(({ theme, overlayColor }) => ({
  position: 'absolute',
  bottom: 0,
  overflow: 'hidden',
  backgroundColor: overlayColor || theme.colors.secondary,

  // the following values were determined by the precise & scientific
  // method of guess and check.
  height: '20%',
  left: '40%',
  right: '40%',
}))(View);

const ClippingMask = styled(({ rounded, containerWidth }) => ({
  overflow: 'hidden',
  position: 'absolute',

  // the following values were determined by the precise & scientific
  // method of guess and check.
  borderRadius: rounded ? containerWidth * 4 : null,
  top: '-400%',
  left: '-200%',
  right: '-200%',
  bottom: 0,
}))(View);

const SizingContainer = styled({
  width: '100%',
  aspectRatio: 1,
})(View);

const OverlayBackgroundImage = ({
  rounded = true,
  overlayColor,
  style,
  ...props
}) => {
  const [layoutState, setLayout] = useState({
    width: DeviceWindow.width,
    height: DeviceWindow.width,
  });

  return (
    <SizingContainer
      style={style}
      onLayout={({ nativeEvent: { layout } = {} }) => setLayout(layout)}
    >
      <ClippingMask rounded={rounded} containerWidth={layoutState.width}>
        <ImageContainer overlayColor={overlayColor}>
          {props.source ? <Image {...props} /> : null}
        </ImageContainer>
      </ClippingMask>
    </SizingContainer>
  );
};

export default OverlayBackgroundImage;
