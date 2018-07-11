import { createBottomTabNavigator } from 'react-navigation';

import Connect from './connect';
import Home from './home';
import Discover from './discover';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Discover,
    Connect,
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#17B582', // TODO: get from theme
      inactiveTintColor: '#A5A5A5', // TODO: get from theme
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

TabNavigator.navigationOptions = {
  header: null,
};

export default TabNavigator;
