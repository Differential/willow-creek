import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import Connect from './Connect';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
  },
  {
    initialRouteName: 'Connect',
  }
);

ConnectNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('profile'),
};

export default ConnectNavigator;
