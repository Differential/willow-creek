import { createBottomTabNavigator } from 'react-navigation';
import { ConnectStack } from './connect';
import { HomeStack } from './home';
import { ProfileStack } from './profile';
import { SearchStack } from './search';
import { SectionsStack } from './sections';

export { default as ConnectStack } from './connect';
export { default as HomeStack } from './home';
export { default as ProfileStack } from './profile';
export { default as SearchStack } from './search';
export { default as SectionsStack } from './sections';

export const TabStack = createBottomTabNavigator({
  Home: HomeStack,
  Sections: SectionsStack,
  Connect: ConnectStack,
  Search: SearchStack,
  Profile: ProfileStack,
});
