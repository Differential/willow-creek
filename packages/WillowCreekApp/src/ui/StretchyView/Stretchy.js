import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

class Stretchy extends Component {
  static propTypes = {
    scrollY: PropTypes.shape({
      interpolate: PropTypes.func,
    }),
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    layoutHeight: PropTypes.number,
    children: PropTypes.node,
    stretchOn: PropTypes.oneOf(['top', 'bottom']),
    style: PropTypes.any, // eslint-disable-line
  };

  get stretchyYPosition() {
    if (!this.props.scrollY || !this.props.height) return 0;

    if (this.props.stretchOn === 'top') {
      return this.props.scrollY.interpolate({
        inputRange: [
          this.props.y - this.props.height,
          this.props.y,
          this.props.y + this.props.height,
        ],
        outputRange: [this.props.height / 2, 0, -this.props.height],
      });
    }

    if (this.props.stretchOn === 'bottom') {
      return this.props.scrollY.interpolate({
        inputRange: [
          0,
          this.props.y + this.props.height - this.props.layoutHeight,
          this.props.y +
            this.props.height -
            this.props.layoutHeight +
            this.props.height,
        ],
        outputRange: [
          this.props.y,
          this.props.layoutHeight - this.props.height,
          this.props.layoutHeight - this.props.height - this.props.height / 2,
        ],
      });
    }

    return 0;
  }

  get stretchyScale() {
    if (!this.props.scrollY) return 1;

    if (this.props.stretchOn === 'top') {
      return this.props.scrollY.interpolate({
        inputRange: [
          this.props.y - this.props.height,
          this.props.y,
          this.props.y + this.props.height,
        ],
        outputRange: [2, 1, 1],
      });
    }

    if (this.props.stretchOn === 'bottom') {
      return this.props.scrollY.interpolate({
        inputRange: [
          0,
          this.props.y + this.props.height - this.props.layoutHeight,
          this.props.y +
            this.props.height -
            this.props.layoutHeight +
            this.props.height,
        ],
        outputRange: [1, 1, 2],
      });
    }

    return 1;
  }

  get stretchyOpacity() {
    if (!this.props.scrollY || !this.props.height) return 0;

    if (this.props.stretchOn === 'top') {
      return this.props.scrollY.interpolate({
        inputRange: [this.props.y - 0.1, this.props.y, this.props.y + 0.1],
        outputRange: [1, 0, 0],
      });
    }
    if (this.props.stretchOn === 'bottom') {
      return this.props.scrollY.interpolate({
        inputRange: [
          this.props.y + this.props.height - this.props.layoutHeight - 0.1,
          this.props.y + this.props.height - this.props.layoutHeight,
          this.props.y + this.props.height - this.props.layoutHeight + 0.1,
        ],
        outputRange: [0, 0, 1],
      });
    }

    return 0;
  }

  get stretchyStyle() {
    return [
      {
        position: 'absolute',
        top: 0,
        left: 0,
        width: this.props.width,
        height: this.props.height,
        transform: [
          { translateY: this.stretchyYPosition },
          { scale: this.stretchyScale },
        ],
        opacity: this.stretchyOpacity,
      },
      this.props.style,
    ];
  }

  render() {
    const { scrollY, style, ...otherProps } = this.props;
    return <Animated.View {...otherProps} style={this.stretchyStyle} />;
  }
}

export default Stretchy;
