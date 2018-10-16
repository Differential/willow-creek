import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BackHandler,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Query, withApollo } from 'react-apollo';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import { compose } from 'recompose';

import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import { withTheme, withThemeMixin } from 'apolloschurchapp/src/ui/theme';
import styled from 'apolloschurchapp/src/ui/styled';
import { H4, H6 } from 'apolloschurchapp/src/ui/typography';
import Icon from 'apolloschurchapp/src/ui/Icon';
import Touchable from 'apolloschurchapp/src/ui/Touchable';

import Seeker from './Seeker';
import { getControlState } from './queries';
import {
  play,
  pause,
  exitFullscreen,
  showVideo,
  hideVideo,
  mute,
  unmute,
} from './mutations';

import { ControlsConsumer } from './PlayheadState';

const Background = withTheme(({ theme }) => ({
  style: StyleSheet.absoluteFill,
  colors: [
    theme.colors.darkPrimary,
    theme.colors.transparent,
    theme.colors.darkPrimary,
  ],
  locations: [0, 0.4, 0.95],
}))(LinearGradient);

const UpperControl = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})(PaddedView);

const LowerControl = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(PaddedView);

const PlayControls = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingBottom: theme.sizing.baseUnit * 1.5,
}))(PaddedView);

const PlayHead = styled({ paddingVertical: 0 })(PaddedView);

const Titles = styled({
  alignItems: 'center',
  paddingVertical: 0,
})(PaddedView);

const Title = styled({ textAlign: 'center' })(H4);
const Artist = styled({ textAlign: 'center' })(H6);

const IconSm = withTheme(({ theme, disabled }) => ({
  size: theme.sizing.baseUnit,
  opacity: disabled ? 0.5 : 1.25,
}))(Icon);

const IconMd = withTheme(({ theme, disabled }) => ({
  size: theme.sizing.baseUnit * 1.875,
  opacity: disabled ? 0.5 : 1,
}))(Icon);

const IconLg = withTheme(({ theme, disabled }) => ({
  size: theme.sizing.baseUnit * 3.125,
  opacity: disabled ? 0.5 : 1,
}))(Icon);

/**
 * FullscreenControls displays fading player controls
 */
class FullscreenControls extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      mutate: PropTypes.func,
    }),
  };

  state = {};

  fader = new Animated.Value(1);

  controlsVisible = true;

  wasFullscreen = false;

  open = Animated.spring(this.fader, {
    toValue: 1,
    useNativeDriver: true,
  });

  close = Animated.spring(this.fader, {
    toValue: 0,
    useNativeDriver: true,
  });

  constructor(...args) {
    super(...args);
    this.fader.addListener(({ value }) => {
      this.controlsVisible = value > 0.05;
    });
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.wasFullscreen) {
        this.handleClose();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
  }

  handleOnScrubbing = ({ isScrubbing }) => {
    this.setState({ isScrubbing });
  };

  handleClose = () => {
    this.props.client.mutate({ mutation: exitFullscreen });
  };

  handlePlay = () => {
    this.props.client.mutate({ mutation: play });
  };

  handlePause = () => {
    this.props.client.mutate({ mutation: pause });
  };

  handleShowVideo = () => {
    this.props.client.mutate({ mutation: showVideo });
  };

  handleHideVideo = () => {
    this.props.client.mutate({ mutation: hideVideo });
  };

  handleMute = () => {
    this.props.client.mutate({ mutation: mute });
  };

  handleUnMute = () => {
    this.props.client.mutate({ mutation: unmute });
  };

  handleControlVisibility = () => {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.open.stop();
    this.close.stop();

    if (
      !this.state.isScrubbing &&
      this.isVideo &&
      this.isPlaying &&
      this.wasFullscreen &&
      (!this.animatingClosed && this.controlsVisible)
    ) {
      this.animatingClosed = true;
      this.close.start(() => {
        this.animatingClosed = false;
      });
    } else {
      this.open.start(() => {
        if (this.isVideo && this.isPlaying) this.queueClose();
      });
    }
  };

  queueClose = () => {
    this.closeTimeout = setTimeout(this.handleControlVisibility, 5000);
  };

  renderSkipForward = ({ skip }) => (
    <Touchable onPress={() => skip(30)}>
      <IconMd name="skip-forward-thirty" />
    </Touchable>
  );

  renderSkipBack = ({ skip }) => (
    <Touchable onPress={() => skip(-30)}>
      <IconMd name="skip-back-thirty" />
    </Touchable>
  );

  renderFullscreenControls = ({ data: { mediaPlayer = {} } = {} }) => {
    this.isVideo = get(mediaPlayer, 'showVideo');
    this.isPlaying = mediaPlayer.isPlaying;

    if (
      (mediaPlayer.isFullscreen && !this.wasFullscreen) ||
      !this.isVideo ||
      (!this.isPlaying || (this.isPlaying && !this.wasPlaying))
    )
      this.handleControlVisibility();

    this.wasFullscreen = mediaPlayer.isFullscreen;
    this.wasPlaying = mediaPlayer.isPlaying;

    return (
      <TouchableWithoutFeedback onPress={this.handleControlVisibility}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: this.fader }]}
        >
          <Background>
            <SafeAreaView
              style={StyleSheet.absoluteFill}
              forceInset={{ top: 'always', bottom: 'always' }}
            >
              <Touchable onPress={this.handleClose}>
                <UpperControl>
                  <IconSm name="arrow-down" />
                  <Titles>
                    <Title>{get(mediaPlayer, 'currentTrack.title')}</Title>
                    <Artist>{get(mediaPlayer, 'currentTrack.artist')}</Artist>
                  </Titles>
                  <IconSm name="empty" />
                </UpperControl>
              </Touchable>
              <LowerControl>
                <PlayHead>
                  <Seeker onScrubbing={this.handleOnScrubbing} />
                </PlayHead>
                <PlayControls>
                  {get(mediaPlayer, 'muted') ? (
                    <Touchable onPress={this.handleUnMute}>
                      <IconSm name="mute" />
                    </Touchable>
                  ) : (
                    <Touchable onPress={this.handleMute}>
                      <IconSm name="volume" />
                    </Touchable>
                  )}
                  <ControlsConsumer>{this.renderSkipBack}</ControlsConsumer>
                  {mediaPlayer.isPlaying ? (
                    <Touchable onPress={this.handlePause}>
                      <IconLg name="pause" />
                    </Touchable>
                  ) : (
                    <Touchable onPress={this.handlePlay}>
                      <IconLg name="play" />
                    </Touchable>
                  )}
                  <ControlsConsumer>{this.renderSkipForward}</ControlsConsumer>
                  {mediaPlayer.showVideo ? (
                    <Touchable onPress={this.handleHideVideo}>
                      <IconSm name="video" />
                    </Touchable>
                  ) : (
                    <Touchable onPress={this.handleShowVideo}>
                      <IconSm name="video-off" />
                    </Touchable>
                  )}
                </PlayControls>
              </LowerControl>
            </SafeAreaView>
          </Background>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <Query query={getControlState}>{this.renderFullscreenControls}</Query>
    );
  }
}

export default compose(
  withApollo,
  withThemeMixin({ type: 'dark' })
)(FullscreenControls);
