import React, { PureComponent } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { FlexedView } from '@apollosproject/ui-kit';

class StretchyView extends PureComponent {
  static propTypes = {
    // The content or component to render in the stretchy view area
    StretchyComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    children: PropTypes.func.isRequired,
  };

  state = {
    stretchyHeight: 1,
  };

  scrollY = new Animated.Value(0);

  stretchyHeight = new Animated.Value(1);

  handleScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: this.scrollY } } },
    { useNativeDriver: true },
  ]);

  get stretchyYPosition() {
    return this.scrollY.interpolate({
      inputRange: [-this.state.stretchyHeight, 0, this.state.stretchyHeight],
      outputRange: [
        this.state.stretchyHeight / 2,
        0,
        -this.state.stretchyHeight,
      ],
    });
  }

  get stretchyScale() {
    return this.scrollY.interpolate({
      inputRange: [-this.state.stretchyHeight, 0, 1],
      outputRange: [2, 1, 1],
    });
  }

  get stretchyStyle() {
    return {
      transform: [
        { translateY: this.stretchyYPosition },
        { scale: this.stretchyScale },
      ],
    };
  }

  render() {
    const { StretchyComponent, children, ...otherProps } = this.props;

    const stretchyElement = React.isValidElement(StretchyComponent) ? (
      StretchyComponent
    ) : (
      <StretchyComponent />
    );

    return (
      <FlexedView {...otherProps}>
        <Animated.View
          style={this.stretchyStyle}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => this.setState({ stretchyHeight: height })}
        >
          {stretchyElement}
        </Animated.View>
        <View style={StyleSheet.absoluteFill}>
          {children({
            stretchyHeight: this.state.stretchyHeight,
            scrollEventThrottle: 16,
            onScroll: this.handleScroll,
          })}
        </View>
      </FlexedView>
    );
  }
}

export default StretchyView;
