import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube-sdk';
import Video from 'react-native-video';

class YoutubeVideoWindow extends Component {
  // eslint-disable-line
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string,
    }),
    paused: PropTypes.bool,
    onLoadStart: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBuffer: PropTypes.func,
    onProgress: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
  };

  didLoad = false;

  didEnd = false;

  lastDuration = 1;

  componentWillReceiveProps(newProps) {
    if (!this.isYoutube) return;
    if (newProps.paused !== this.props.paused) {
      if (newProps.paused) {
        this.video.pause();
      } else {
        this.video.play();
      }
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  get isYoutube() {
    return this.props.source && !this.props.source.uri.includes('http');
  }

  setVideoRef = (element) => {
    this.video = element;
  };

  handleOnReady = () => {
    if (!this.isYoutube) return;
    this.didLoad = false;
    if (this.props.onLoadStart) this.props.onLoadStart();
  };

  handleOnChangeState = ({ state }) => {
    if (!this.isYoutube) return;
    if (this.props.onBuffer)
      this.props.onBuffer({ isBuffering: state === 'BUFFERING' });

    if (state === 'ENDED') {
      this.video.seekTo(0);
      this.props.onProgress({
        currentTime: 0,
        playableDuration: this.lastDuration,
        seekableDuration: this.lastDuration,
      });
      this.props.onEnd();
    }

    const isNowPlaying = state === 'PLAYING';
    if (isNowPlaying !== this.isPlaying) {
      this.isPlaying = isNowPlaying;
      this.handlePlayListener();
    }
  };

  handleOnError = (...args) => {
    this.props.onError(...args);
  };

  handleOnProgress = ({ currentTime, duration }) => {
    if (!this.isYoutube) return;
    if (!this.didLoad || duration !== this.lastDuration) {
      this.didLoad = true;
      this.props.onLoad({ duration });
    }

    this.lastDuration = duration;

    this.props.onProgress({
      currentTime,
      playableDuration: duration,
      seekableDuration: duration,
    });
  };

  handlePlayListener = () => {
    if (!this.isYoutube) return;
    if (!this.isPlaying) return;
    requestAnimationFrame(async () => {
      if (this.unmounted || !this.isPlaying) return;
      const currentTime = await this.video.getCurrentTime();
      const duration = await this.video.getVideoDuration();
      this.handleOnProgress({ currentTime, duration });
      this.handlePlayListener();
    });
  };

  seek = (time) => {
    if (!this.isYoutube) return this.video.seek(time);
    this.video.seekTo(time);
  };

  render() {
    // gracefully handle non-youtube videos
    if (!this.isYoutube)
      return <Video {...this.props} ref={this.setVideoRef} />;

    const { source, paused } = this.props;
    const videoId = source.uri;

    return (
      <YouTube
        videoId={videoId}
        fullscreen={false}
        autoPlay={!paused}
        // loop={repeat}
        // controls={0}
        // showFullscreenButton={false}
        // showinfo={false}
        // modestbranding
        // resumePlayAndroid
        style={StyleSheet.absoluteFill}
        // onReady={this.handleOnReady}
        // onChangeState={this.handleOnChangeState}
        // onProgress={this.handleOnProgress}
        // onError={this.handleOnError}
        ref={this.setVideoRef}
        showFullScreenButton={false}
        showSeekBar={false}
        showPlayPauseButton={false}
        onReady={this.handleOnReady}
        onError={this.handleOnError}
        onChangeState={this.handleOnChangeState}
      />
    );
  }
}

export default YoutubeVideoWindow;
