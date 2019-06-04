import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Connect from './connect';
import Grow from './grow';
import MyWillow from './my-willow';

const TabNavigator = createBottomTabNavigator(
  {
    Grow,
    Home: MyWillow,
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
  }
);

TabNavigator.navigationOptions = {
  header: null,
};

export default TabNavigator;
