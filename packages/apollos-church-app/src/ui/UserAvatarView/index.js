import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Avatar from 'apollos-church-app/src/ui/Avatar';
import { withTheme } from 'apollos-church-app/src/ui/theme';
import { H4, BodyText } from 'apollos-church-app/src/ui/typography';
import PaddedView from 'apollos-church-app/src/ui/PaddedView';
import ConnectedImage from 'apollos-church-app/src/ui/ConnectedImage';
import Touchable from 'apollos-church-app/src/ui/Touchable';
import styled from 'apollos-church-app/src/ui/styled';

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

const StyledAvatar = withTheme(({ theme }) => ({
  containerStyle: {
    marginRight: 0,
    marginBottom: theme.sizing.baseUnit / 2,
  },
}))(Avatar);

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
}) => {
  const ImageContainer = Touchable;
  // todo: handle file select stuff
  return (
    <Container {...viewProps}>
      <Content>
        <ImageContainer>
          <StyledAvatar
            source={photo}
            size="large"
            isLoading={isUploadingFile}
          />
        </ImageContainer>
        <Name>
          {firstName} {lastName}
        </Name>
        {home ? <City>{home.city}</City> : null}
      </Content>
    </Container>
  );
};

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
