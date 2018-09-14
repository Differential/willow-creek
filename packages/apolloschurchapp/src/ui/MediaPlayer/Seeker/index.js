import React, { PureComponent } from 'react';
import { PanResponder, Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'apolloschurchapp/src/ui/styled';

import { PlayheadConsumer, ControlsConsumer } from '../PlayheadState';
import Timestamp, { TIME_TEXT_WIDTH } from './Timestamp';

const Container = styled({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})(View);

const Track = styled(({ theme, minimal }) => ({
  backgroundColor: minimal
    ? theme.colors.transparent
    : theme.colors.darkSecondary,
  borderRadius: minimal ? 0 : theme.sizing.borderRadius,
  overflow: 'hidden',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}))(View);

const TrackContainer = styled(({ theme, minimal }) => ({
  position: 'absolute',
  left: minimal ? 0 : TIME_TEXT_WIDTH,
  right: minimal ? 0 : TIME_TEXT_WIDTH,
  height: theme.sizing.borderRadius,
}))(View);

const Knob = styled(({ theme, minimal }) => {
  const size = minimal ? 0 : theme.sizing.borderRadius * 2;
  return {
    backgroundColor: theme.colors.text.primary,
    borderRadius: size,
    position: 'absolute',
    top: -(size / 2) + theme.sizing.borderRadius / 2,
    right: -(size / 2),
    height: size,
    width: size,
    elevation: 2,
  };
})(View);

const ProgressBar = styled(({ theme }) => ({
  backgroundColor: theme.colors.secondary,
  ...StyleSheet.absoluteFillObject,
}))(View);

/**
 * Animated Seeker component.
 * Depends on `PlayheadState`, so you don't pass it any props directly,
 * but must be rendered within a `<MediaPlayer/>` component
 */
class Seeker extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool, // The only prop you need to pass - switches to a minimal version (line instead of bar)
    currentTime: PropTypes.any, // eslint-disable-line
    duration: PropTypes.any, // eslint-disable-line
    style: PropTypes.any, // eslint-disable-line
    onScrubbing: PropTypes.func,
  };

  state = {
    width: 0, // the width of the seeker bar
    isSeeking: false,
    timeAtSeekingStart: 0,
  };

  offsetDriver = new Animated.Value(0); // Used to track pixel offset when seeking

  offsetTimeDriver = new Animated.Value(0); // Used to track time offset when seeking

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // Using `stopAnimation` only to get the currentTime value
      this.props.currentTime.stopAnimation((value) => {
        this.setState({
          isSeeking: true,
          timeAtSeekingStart: value,
        });
      });
    },
    onPanResponderMove: (e, { dx }) => {
      // Calculate the pixel offset and apply it to the offsetDriver
      let offset = dx;
      const progressAtStart =
        this.state.timeAtSeekingStart / this.props.duration;
      const positionAtStart = progressAtStart * this.state.width;
      offset = Math.min(this.state.width - positionAtStart, offset);
      offset = Math.max(-positionAtStart, offset);
      this.offsetDriver.setValue(offset);

      // Calculate the time offset and apply it to the offsetTimeDriver
      const moveAmount = offset / this.state.width;
      const moveAmountInTime = moveAmount * this.props.duration;
      this.offsetTimeDriver.setValue(moveAmountInTime);

      if (this.props.onScrubbing) this.props.onScrubbing({ isScrubbing: true });
    },
    onPanResponderRelease: async (e, { dx }) => {
      // Calculate the amount in time we've moved, and skip that duration
      const moveAmount = dx / this.state.width;
      const moveAmountInTime = moveAmount * this.props.duration;
      await this.props.skip(moveAmountInTime);

      // Reset state
      this.offsetDriver.setValue(0);
      this.offsetTimeDriver.setValue(0);
      this.setState({
        isSeeking: false,
        timeAtSeekingStart: 0,
      });

      if (this.props.onScrubbing)
        this.props.onScrubbing({ isScrubbing: false });
    },
  });

  // Calculate the real offset position of the colored track bar
  // To be able to useNativeDriver, the trackbar is always the full-width, and we animate its X position
  get trackBarOffset() {
    const progress = Animated.divide(
      this.state.isSeeking
        ? this.state.timeAtSeekingStart
        : this.props.currentTime,
      this.props.duration
    );

    const progressInvert = Animated.subtract(1, progress);
    const widthInvert = Animated.multiply(-1, this.state.width);
    const position = Animated.multiply(progressInvert, widthInvert);
    return Animated.add(position, this.offsetDriver);
  }

  // the "knob" is on top of the trackbar, the piece of UI you can grab and move around
  get knobStyles() {
    return [
      StyleSheet.absoluteFill,
      {
        overflow: 'visible',
        transform: [{ translateX: this.trackBarOffset }],
      },
    ];
  }

  get progressBarStyles() {
    return [
      StyleSheet.absoluteFill,
      {
        transform: [{ translateX: this.trackBarOffset }],
      },
    ];
  }

  handleOnLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.setState({ width });
  };

  renderProgress = () => (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ translateX: this.trackBarOffset }],
        },
      ]}
    >
      <ProgressBar />
    </Animated.View>
  );

  render() {
    return (
      <Container style={this.props.style}>
        {!this.props.minimal ? (
          <Timestamp
            time={this.props.currentTime}
            offset={this.offsetTimeDriver}
          />
        ) : null}
        <TrackContainer minimal={this.props.minimal}>
          <Track onLayout={this.handleOnLayout} minimal={this.props.minimal}>
            {this.renderProgress()}
          </Track>
          <Animated.View style={this.knobStyles}>
            <Knob
              minimal={this.props.minimal}
              {...this.panResponder.panHandlers}
            />
          </Animated.View>
        </TrackContainer>
        {!this.props.minimal ? <Timestamp time={this.props.duration} /> : null}
      </Container>
    );
  }
}

const SeekerWithState = (props) => (
  <ControlsConsumer>
    {(controls) => (
      <PlayheadConsumer>
        {(playhead) => <Seeker {...props} {...playhead} {...controls} />}
      </PlayheadConsumer>
    )}
  </ControlsConsumer>
);

export default SeekerWithState;
