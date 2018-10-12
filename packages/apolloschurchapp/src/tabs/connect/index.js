import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import TestingControlPanel from '../../testing-control-panel';
import Connect from './Connect';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
  },
  {
    initialRouteName: 'Connect',
  }
);

ConnectNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('profile'),
};

export default ConnectNavigator;
