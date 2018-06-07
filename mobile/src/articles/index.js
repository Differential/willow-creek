import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Articles extends React.Component {
  static navigationOptions = {
    title: 'Articles',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Article List</Text>
      </View>
    );
  }
}

export default Articles;
