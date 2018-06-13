import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

export class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };
  render() {
    return (
      <FlexedView>
        <LiveNowButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text>Search Screen</Text>
        </View>
      </FlexedView>
    );
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Search',
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

export default SearchStack;
