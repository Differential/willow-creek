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

class Devotionals extends React.Component {
  static navigationOptions = {
    title: 'Devotionals',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Devotional List</Text>
      </View>
    );
  }
}

export default Devotionals;
