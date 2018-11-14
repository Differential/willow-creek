import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  ConnectedImage,
  Touchable,
  ButtonLink,
  Avatar,
  withTheme,
  H5,
  styled,
} from '@apollosproject/ui-kit';
import uploadPhoto from './uploadPhoto';

const StyledAvatar = withTheme(({ theme }) => ({
  containerStyle: {
    marginRight: 0,
    marginBottom: theme.sizing.baseUnit / 2,
  },
}))(Avatar);

const Wrapper = styled({
  justifyContent: 'center',
  alignItems: 'center',
})(View);

export default class AvatarForm extends PureComponent {
  state = {
    isUploadingFile: false,
  };

  componentWillUnmount() {
    this.setState({ isUploadingFile: false });
  }

  handleUploadPhoto = async () => {
    try {
      await uploadPhoto({
        onUpload: () => this.setState({ isUploadingFile: true }),
      });
      await this.props.refetch();
      await this.setState({ isUploadingFile: false });
    } catch (e) {
      this.setState({ isUploadingFile: false });
    }
  };

  render() {
    const { photo } = this.props;
    const { isUploadingFile } = this.state;

    return (
      <Wrapper>
        <Touchable
          disabled={this.props.disabled}
          onPress={this.handleUploadPhoto}
        >
          <StyledAvatar
            source={photo}
            size="medium"
            isLoading={isUploadingFile}
          />
        </Touchable>
        {this.props.text ? (
          <H5>
            <ButtonLink onPress={this.handleUploadPhoto}>
              Change Photo
            </ButtonLink>
          </H5>
        ) : null}
      </Wrapper>
    );
  }
}

AvatarForm.propTypes = {
  refetch: PropTypes.func.isRequired,
  photo: ConnectedImage.propTypes.source,
  disabled: PropTypes.bool,
  text: PropTypes.bool,
};
