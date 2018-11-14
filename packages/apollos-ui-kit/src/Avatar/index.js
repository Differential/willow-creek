import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { get } from 'lodash';
import { compose } from 'recompose';

import ConnectedImage from '../ConnectedImage';
import styled from '../styled';
import { withTheme } from '../theme';
import ActivityIndicator from '../ActivityIndicator';
import Icon from '../Icon';

export { default as AvatarList } from './List';

const enhance = withTheme(({ theme, size }) => ({
  themeSize: get(theme.sizing.avatar, size, theme.sizing.avatar.small),
}));

const Container = styled(
  ({ theme, themeSize }) => ({
    width: themeSize,
    height: themeSize,
    backgroundColor: theme.colors.white,
    borderRadius: themeSize / 2,
    marginRight: themeSize / 4,
    marginBottom: themeSize / 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
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

const PlaceholderIcon = compose(
  withTheme(({ theme: { colors } = {} }) => ({
    fill: colors.background.inactive,
  }))
)(Icon);

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
      ) : (
        <PlaceholderIcon name="avatar" size={themeSize} />
      )}
    </Container>
  )
);

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  containerStyle: PropTypes.any, // eslint-disable-line
  ...ConnectedImage.propTypes,
};

export default withTheme(({ theme, size }) => ({
  themeSize: get(theme.sizing.avatar, size, theme.sizing.avatar.small),
}))(Avatar);
