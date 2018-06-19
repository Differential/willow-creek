import React from 'react';
import { Query } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { withTheme } from 'ui/theme';
import FeedView from 'ui/FeedView';
import BackgroundView from 'ui/BackgroundView';

import GET_USER_FEED from './query';
import tabBarIcon from '../tabBarIcon';
import LiveNowButton from '../../live';

// TODO: what are our thoughts around using this @-syntax for HOCs?
@withTheme(({ theme, ...otherProps }) => ({
  headerBackgroundColor: theme.colors.background.primary,
  headerTintColor: theme.colors.background.paper,
  ...otherProps,
}))
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Apollos Church',
    headerStyle: {
      backgroundColor: navigation.getParam('backgroundColor'),
    },
    headerTintColor: navigation.getParam('tintColor'),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
    headerBackgroundColor: PropTypes.string,
    headerTintColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    props.navigation.setParams({
      backgroundColor: props.headerBackgroundColor,
      tintColor: props.headerTintColor,
    });
  }

  onPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.node.id,
      itemTitle: item.node.title,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={GET_USER_FEED}>
          {({ loading, error, data, refetch }) => (
            <FeedView
              content={get(data, 'userFeed.edges', [])}
              isLoading={loading}
              error={error}
              refetch={refetch}
              ListHeaderComponent={LiveNowButton}
              onPressItem={this.onPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

HomeStack.navigationOptions = {
  tabBarIcon: tabBarIcon('home'),
};

export default HomeStack;
