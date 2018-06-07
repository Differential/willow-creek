import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Articles from 'articles';
import Devotionals from 'devotionals';
import News from 'news';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class SectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Sections',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Sections Screen</Text>
        <Button
          title="Articles"
          onPress={() => this.props.navigation.navigate('Articles')}
        />
        <Button
          title="Devotionals"
          onPress={() => this.props.navigation.navigate('Devotionals')}
        />
        <Button
          title="News"
          onPress={() => this.props.navigation.navigate('News')}
        />
      </View>
    );
  }
}

SectionsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export const SectionsStack = createStackNavigator(
  {
    Sections: SectionsScreen,
    Articles,
    Devotionals,
    News,
  },
  {
    initialRouteName: 'Sections',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default SectionsStack;
