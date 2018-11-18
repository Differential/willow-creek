import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  H3,
  PaddedView,
  ConnectedImage,
  styled,
  ChannelLabel,
  withIsLoading,
} from '@apollosproject/ui-kit';

import AvatarForm from './AvatarForm';

const Container = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  flexDirection: 'row',
}))(View);

const Content = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  paddingVertical: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

const UserAvatarView = withIsLoading(
  ({
    theme,
    photo,
    firstName,
    lastName,
    location,
    isLoading,
    refetch,
    onPhotoPress,
    setIsUploadingFile,
    isUploadingFile,
    disabled,
    ...viewProps
  }) => (
    // todo: handle file select stuff
    <Container {...viewProps}>
      <AvatarForm
        isLoading={isLoading}
        text={false}
        disabled={disabled}
        photo={photo}
        refetch={refetch}
      />
      <Content>
        <H3>
          {firstName} {lastName}
        </H3>
        <ChannelLabel icon="pin" label={location || ''} isLoading={isLoading} />
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
