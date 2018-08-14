import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Video from 'react-native-video';

import GradientOverlayImage from '/mobile/ui/GradientOverlayImage';

import { VideoWrapper, PlayButton, PlayIcon } from './styles';

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
    overlayColor: PropTypes.string,
  };

  constructor() {
    super();

    this.state = { paused: true };
  }

  setVideoRef = (element) => {
    this.video = element;
  };

  handleOnPress = () => {
    this.video.presentFullscreenPlayer();
  };

  handleTogglePaused = () => {
    this.setState((prevState) => ({ paused: !prevState.paused }));
  };

  handleOnEnd = () => {
    this.handleTogglePaused();
    this.video.dismissFullscreenPlayer();
  };

  render() {
    const { source, thumbnail, overlayColor, ...otherProps } = this.props;

    return (
      <VideoWrapper>
        <GradientOverlayImage
          source={thumbnail}
          overlayColor={overlayColor}
          isLoading={!thumbnail}
        />
        {source && source.uri
          ? [
              <PlayButton
                onPress={this.handleOnPress}
                key={'VideoPlayerPlaybutton'}
              >
                <PlayIcon />
              </PlayButton>,
              <Video
                ref={this.setVideoRef}
                source={source}
                paused={this.state.paused}
                onFullscreenPlayerDidPresent={this.handleTogglePaused}
                onFullscreenPlayerDidDismiss={this.handleTogglePaused}
                onAudioBecomingNoisy={this.handleTogglePaused}
                onEnd={this.handleOnEnd}
                onError={this.handleOnEnd} // set state to paused and exit native player TODO: consider retrying
                ignoreSilentSwitch={'ignore'}
                playInBackground
                playWhenInactive
                key={'VideoPlayerObject'}
                {...otherProps}
              />,
            ]
          : null}
      </VideoWrapper>
    );
  }
}

export default VideoPlayer;
