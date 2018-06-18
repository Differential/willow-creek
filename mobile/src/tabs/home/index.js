import React from 'react';
import { Query } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';
import { get } from 'lodash';
import FeedView from 'ui/FeedView';
import PropTypes from 'prop-types';
import FlexedView from 'ui/FlexedView';
import GET_USER_FEED from './query';
import LiveNowButton from '../../live';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  onPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.node.id,
      itemTitle: item.node.title,
    });

  render() {
    return (
      <FlexedView>
        <LiveNowButton navigation={this.props.navigation} />
        <Query query={GET_USER_FEED}>
          {({ loading, error, data }) => (
            <FeedView
              content={get(data, 'userFeed.edges', [])}
              isLoading={loading}
              error={error}
              onPressItem={this.onPress}
            />
          )}
        </Query>
      </FlexedView>
    );
  }
}

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default HomeStack;
