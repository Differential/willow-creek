import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Connect from './connect';
import Discover from './discover';
import Home from './home';

const TabNavigator = createBottomTabNavigator(
  {
    Discover,
    Home,
    Connect,
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: TabBar,
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'InterUI-Medium',
        fontSize: 12,
      },
    },
    lazy: true,
    removeClippedSubviews: true,
    navigationOptions: { header: null },
  }
);

export default TabNavigator;
