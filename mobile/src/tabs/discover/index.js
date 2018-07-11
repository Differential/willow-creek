import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import Discover from './Discover';

export const DiscoverNavigator = createStackNavigator(
  {
    Discover,
  },
  {
    initialRouteName: 'Discover',
  }
);

DiscoverNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('sections'),
};

export default DiscoverNavigator;
