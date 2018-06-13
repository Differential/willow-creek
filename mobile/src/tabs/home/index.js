import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import FlexedView from 'ui/FlexedView';
import LiveNowButton from '../../live';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <FlexedView>
        <LiveNowButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text>This is the home screen</Text>
          <Button
            title="Go to Article"
            onPress={() => this.props.navigation.navigate('ArticleSingle')}
          />
        </View>
      </FlexedView>
    );
  }
}
HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
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

export default HomeStack;
