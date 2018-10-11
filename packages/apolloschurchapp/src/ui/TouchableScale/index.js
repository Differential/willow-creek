import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback } from 'react-native';

class TouchableScale extends Component {
  static propTypes = {
    minScale: PropTypes.number,
    springConfig: PropTypes.shape({}),
  };

  static defaultProps = {
    minScale: 0.95,
    springConfig: {
      speed: 20,
    },
  };

  scale = new Animated.Value(this.props.active ? this.props.minScale : 1);

  animatedStyle = {
    transform: [{ scale: this.scale }],
  };

  handlePressIn = () => {
    Animated.spring(this.scale, {
      toValue: this.props.minScale,
      useNativeDriver: true,
      isInteraction: false,
      ...this.props.springConfig,
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.scale, {
      toValue: 1,
      useNativeDriver: true,
      isInteraction: false,
      ...this.props.springConfig,
    }).start();
  };

  render() {
    const { minScale, style, children, ...touchableProps } = this.props;
    return (
      <TouchableWithoutFeedback
        {...touchableProps}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[this.animatedStyle, style]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TouchableScale;
