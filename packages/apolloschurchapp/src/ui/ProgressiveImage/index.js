import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import styled from 'apolloschurchapp/src/ui/styled';
import ConnectedImage from 'apolloschurchapp/src/ui/ConnectedImage';

const Wrapper = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  backgroundColor: theme.colors.background.inactive,
}))(View);

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

class ProgressiveImage extends PureComponent {
  static propTypes = {
    source: ConnectedImage.propTypes.source,
    thumbnail: ConnectedImage.propTypes.source,
    thumbnailBlurRadius: PropTypes.number,
    imageStyle: PropTypes.any, // eslint-disable-line
    ...ConnectedImage.propTypes,
  };

  static defaultProps = {
    thumbnailBlurRadius: 2,
  };

  render() {
    const {
      source,
      thumbnail,
      thumbnailFadeDuration,
      imageFadeDuration,
      thumbnailBlurRadius,
      onLoadThumbnail,
      onLoadImage,
      imageStyle,
      style,
      ...imageProps
    } = this.props;
    return (
      <Wrapper style={style}>
        {thumbnail ? (
          <ConnectedImage
            {...imageProps}
            blurRadius={thumbnailBlurRadius}
            style={[styles.imageStyles, imageStyle]}
            source={thumbnail}
          />
        ) : null}
        <ConnectedImage
          {...imageProps}
          style={[styles.imageStyles, imageStyle]}
          source={source}
        />
      </Wrapper>
    );
  }
}

export default ProgressiveImage;
