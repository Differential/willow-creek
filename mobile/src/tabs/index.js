import { createBottomTabNavigator } from 'react-navigation';
import ConnectStack from './connect';
import HomeStack from './home';
import SectionsStack from './sections';

export const TabStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Sections: SectionsStack,
    Connect: ConnectStack,
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

TabStack.navigationOptions = {
  header: null,
};
