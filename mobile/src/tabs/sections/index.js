import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import BackgroundView from 'ui/BackgroundView';
import Articles from 'articles';
import Devotionals from 'devotionals';
import News from 'news';
import tabBarIcon from '../tabBarIcon';

export class SectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Discover',
  };
  render() {
    return (
      <BackgroundView>
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
      </BackgroundView>
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
  }
);

SectionsStack.navigationOptions = {
  tabBarIcon: tabBarIcon('sections'),
};

export default SectionsStack;
