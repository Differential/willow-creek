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

class News extends React.Component {
  static navigationOptions = {
    title: 'News',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>News List</Text>
      </View>
    );
  }
}

export default News;
