import React, { Component } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import Context, { initialState } from './context';

const initialDimensions = Dimensions.get('screen');

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

class LayoutProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = initialState;

  rootHeight = initialDimensions.height;

  rootWidth = initialDimensions.width;

  handleRootLayout = ({
    nativeEvent: {
      layout: { height, width },
    },
  }) => {
    this.rootHeight = height;
    this.rootWidth = width;
  };

  handleChildLayout = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    const safeAreaInsets = {
      top: y,
      bottom: this.rootHeight - height - y,
      left: x,
      right: this.rootWidth - width - x,
    };

    if (!isEqual(this.state.safeAreaInsets, safeAreaInsets)) {
      this.setState({ safeAreaInsets });
    }
  };

  render() {
    return (
      <SafeAreaView
        style={StyleSheet.absoluteFill}
        onLayout={this.handleRootLayout}
      >
        <View style={styles.flex} onLayout={this.handleChildLayout} />
        <View style={StyleSheet.absoluteFill}>
          <Context.Provider value={this.state}>
            {this.props.children}
          </Context.Provider>
        </View>
      </SafeAreaView>
    );
  }
}

export default LayoutProvider;
