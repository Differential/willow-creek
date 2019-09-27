import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

import UserSettings from 'WillowCreekApp/src/user-settings';

import TestingControlPanel from '../../testing-control-panel';
import tabBarIcon from '../tabBarIcon';
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
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTintColor: screenProps.headerTintColor,
    }),
    navigationOptions: { tabBarIcon: tabBarIcon('profile') },
  }
);

const EnhancedConnect = withTheme(({ theme, ...props }) => ({
  ...props,
  screenProps: { headerTintColor: theme.colors.text.secondary },
}))(ConnectNavigator);

export default EnhancedConnect;
