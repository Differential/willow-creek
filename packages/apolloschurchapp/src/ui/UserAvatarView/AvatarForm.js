import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ConnectedImage from 'apolloschurchapp/src/ui/ConnectedImage';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import Avatar from 'apolloschurchapp/src/ui/Avatar';
import { withTheme } from 'apolloschurchapp/src/ui/theme';

import uploadPhoto from './uploadPhoto';

const StyledAvatar = withTheme(({ theme }) => ({
  containerStyle: {
    marginRight: 0,
    marginBottom: theme.sizing.baseUnit / 2,
  },
}))(Avatar);

export default class AvatarForm extends PureComponent {
  state = {
    isUploadingFile: false,
  };

  handleUploadPhoto = async () => {
    await uploadPhoto({
      onUpload: () => this.setState({ isUploadingFile: true }),
    });
    await this.props.refetch();
    this.setState({ isUploadingFile: false });
  };

  render() {
    const { photo } = this.props;
    const { isUploadingFile } = this.state;

    return (
      <Touchable onPress={this.handleUploadPhoto}>
        <StyledAvatar source={photo} size="large" isLoading={isUploadingFile} />
      </Touchable>
    );
  }
}

AvatarForm.propTypes = {
  refetch: PropTypes.func.isRequired,
  photo: ConnectedImage.propTypes.source,
};
