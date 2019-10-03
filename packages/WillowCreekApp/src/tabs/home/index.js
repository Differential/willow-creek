import { createStackNavigator } from 'react-navigation';

import Home from './Home';
import Icon from './Icon';

export const HomeNavigator = createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
  }
);

HomeNavigator.navigationOptions = {
  tabBarIcon: Icon,
  tabBarLabel: 'My Willow',
};

export default HomeNavigator;
