import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { H4, BodyText } from 'apolloschurchapp/src/ui/typography';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import ConnectedImage from 'apolloschurchapp/src/ui/ConnectedImage';
import styled from 'apolloschurchapp/src/ui/styled';
import AvatarForm from './AvatarForm';

const Container = styled({
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
})(View);

const Content = styled({ alignItems: 'center', justifyContent: 'center' })(
  PaddedView
);

const Name = H4;
const City = BodyText;

const UserAvatarView = ({
  photo,
  firstName,
  lastName,
  home,
  isLoading,
  refetch,
  onPhotoPress,
  setIsUploadingFile,
  isUploadingFile,
  ...viewProps
}) => (
  // todo: handle file select stuff
  <Container {...viewProps}>
    <Content>
      <AvatarForm photo={photo} refetch={refetch} />
      <Name>
        {firstName} {lastName}
      </Name>
      {home ? <City>{home.city}</City> : null}
    </Content>
  </Container>
);

UserAvatarView.propTypes = {
  photo: ConnectedImage.propTypes.source,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  home: PropTypes.shape({
    city: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  onPhotoPress: PropTypes.func,
  blurIntensity: PropTypes.number,
  allowProfileImageChange: PropTypes.bool,
  ...View.propTypes,
};

export default UserAvatarView;
