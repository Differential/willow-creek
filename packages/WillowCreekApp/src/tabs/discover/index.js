import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

import ContentFeed from 'WillowCreekApp/src/content-feed';

import tabBarIcon from '../tabBarIcon';

import Discover from './Discover';

const DiscoverNavigator = createStackNavigator(
  {
    Discover,
    ContentFeed,
  },
  {
    initialRouteName: 'Discover',
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTintColor: screenProps.headerTintColor,
    }),
    navigationOptions: { tabBarIcon: tabBarIcon('search') },
  }
);

const EnhancedDiscover = withTheme(({ theme, ...props }) => ({
  ...props,
  screenProps: { headerTintColor: theme.colors.text.secondary },
}))(DiscoverNavigator);

export default EnhancedDiscover;
