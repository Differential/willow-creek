import React, { PureComponent } from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video-controls';

import GradientOverlayImage from '/mobile/ui/GradientOverlayImage';

import {
  VideoWrapper,
  PlayButton,
  AndroidPositioningFix,
  PlayIcon,
} from './styles';

class VideoPlayer extends PureComponent {
  static propTypes = {
    thumbnail: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          label: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        })
      ),
      PropTypes.string,
    ]).isRequired,
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
    gradientColor: PropTypes.string,
  };

  constructor() {
    super();

    this.state = { modalVisible: false };
  }

  handleOnPress = () => {
    this.setState({ modalVisible: true });
  };

  handleOnRequestClose = () => this.setState({ modalVisible: false });

  render() {
    const { source, thumbnail, gradientColor, ...otherProps } = this.props;
    return (
      <VideoWrapper>
        <GradientOverlayImage
          source={thumbnail}
          colors={gradientColor}
          isLoading={!thumbnail}
        />
        {source && source.uri
          ? [
              <PlayButton
                onPress={this.handleOnPress}
                key={'VideoPlayerPlaybutton'}
              >
                <AndroidPositioningFix>
                  <PlayIcon />
                </AndroidPositioningFix>
              </PlayButton>,
              <Modal
                visible={this.state.modalVisible}
                onRequestClose={this.handleOnRequestClose}
                animationType={'fade'}
                key={'VideoPlayerModal'}
                hardwareAccelerated
              >
                <Video
                  source={source}
                  onEnd={this.handleOnRequestClose}
                  onBack={this.handleOnRequestClose}
                  onAudioBecomingNoisy={this.handleOnRequestClose}
                  onError={this.handleOnRequestClose} // set state to paused and exit native player TODO: consider retrying
                  playInBackground
                  disableFullscreen // hides unused fullscreen player button
                  {...otherProps}
                />
              </Modal>,
            ]
          : null}
      </VideoWrapper>
    );
  }
}

export default VideoPlayer;
