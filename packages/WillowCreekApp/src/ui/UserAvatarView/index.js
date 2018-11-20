import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  PaddedView,
  ConnectedImage,
  styled,
  ChannelLabel,
  withIsLoading,
} from '@apollosproject/ui-kit';

import AvatarForm from './AvatarForm';

const Container = styled({
  flexDirection: 'row',
})(View);

const Content = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: theme.sizing.baseUnit * 0.5,
  paddingVertical: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

const UserAvatarView = withIsLoading(
  ({
    theme,
    photo,
    children,
    location,
    isLoading,
    refetch,
    onPhotoPress,
    setIsUploadingFile,
    isUploadingFile,
    disabled,
    ...viewProps
  }) => (
    <Container {...viewProps}>
      <AvatarForm
        isLoading={isLoading}
        text={false}
        disabled={disabled}
        photo={photo}
        refetch={refetch}
      />
      <Content>
        {children}
        {isLoading || location ? (
          <ChannelLabel
            icon="pin"
            label={location || ''}
            isLoading={isLoading}
          />
        ) : null}
      </Content>
    </Container>
  )
);

UserAvatarView.propTypes = {
  photo: ConnectedImage.propTypes.source,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  location: PropTypes.string,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  onPhotoPress: PropTypes.func,
  blurIntensity: PropTypes.number,
  allowProfileImageChange: PropTypes.bool,
  ...View.propTypes,
};

export default UserAvatarView;
