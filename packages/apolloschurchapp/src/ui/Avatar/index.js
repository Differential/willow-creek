import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { get } from 'lodash';
import { compose, pure } from 'recompose';

import ConnectedImage from 'apolloschurchapp/src/ui/ConnectedImage';
import styled from 'apolloschurchapp/src/ui/styled';
import { withTheme } from 'apolloschurchapp/src/ui/theme';
import ActivityIndicator from 'apolloschurchapp/src/ui/ActivityIndicator';

export { default as AvatarList } from './List';

const enhance = compose(
  pure,
  withTheme(({ theme, size }) => ({
    themeSize: get(theme.sizing.avatar, size, theme.sizing.avatar.small),
  }))
);

const Container = styled(
  ({ theme, themeSize }) => ({
    width: themeSize,
    height: themeSize,
    backgroundColor: theme.colors.background.inactive,
    borderRadius: themeSize / 2,
    marginRight: themeSize / 4,
    marginBottom: themeSize / 4,
    overflow: 'hidden',
  }),
  'Avatar'
)(View);

const LoadingIcon = compose(
  withTheme(({ theme: { colors } = {} }) => ({ color: colors.white })),
  styled({
    zIndex: 1,
  })
)(ActivityIndicator);

const Image = styled(({ themeSize }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: themeSize / 2,
}))(ConnectedImage);

const Avatar = enhance(
  ({ themeSize, containerStyle, source, isLoading, ...imageProps }) => (
    <Container style={containerStyle} themeSize={themeSize}>
      {isLoading ? <LoadingIcon /> : null}
      {source && source.uri ? (
        <Image
          source={source}
          {...imageProps}
          themeSize={themeSize}
          isLoading={isLoading}
        />
      ) : null}
    </Container>
  )
);

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  containerStyle: PropTypes.any, // eslint-disable-line
  ...ConnectedImage.propTypes,
};

export default Avatar;
