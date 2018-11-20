import { createStackNavigator } from 'react-navigation';

import UserSettings from 'WillowCreekApp/src/user-settings';

import TestingControlPanel from '../../testing-control-panel';
import Icon from './Icon';
import Connect from './Connect';
import LikedContentList from './LikedContentList';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
    UserSettings,
    LikedContentList,
  },
  {
    initialRouteName: 'Connect',
    headerMode: 'screen',
  }
);

ConnectNavigator.navigationOptions = {
  tabBarIcon: Icon,
  tabBarLabel: 'PROFILE',
};

export default ConnectNavigator;
