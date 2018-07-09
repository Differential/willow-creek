import React from 'react';
import { Query } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';

import FeedView from 'ui/FeedView';
import BackgroundView from 'ui/BackgroundView';
import TileContentFeed from './tileContentFeed';
import tabBarIcon from '../tabBarIcon';
import GET_DISCOVER_ITEMS from './query';

const childContentItemLoadingObject = {
  node: {
    isLoading: true,
  },
};

const DiscoverScreen = () => (
  <BackgroundView>
    <Query query={GET_DISCOVER_ITEMS}>
      {({ error, loading, data: { contentChannels = [] } = {}, refetch }) => (
        <FeedView
          error={error}
          content={contentChannels}
          keyExtractor={(item) => item.id}
          isLoading={loading}
          refetch={refetch}
          renderItem={({ item }) => (
            <TileContentFeed
              id={item.id}
              name={item.name}
              content={item.childContentItemsConnection.edges.map(
                (edge) => edge.node
              )}
            />
          )}
          loadingStateObject={{
            name: '',
            childContentItemsConnection: {
              edges: [
                childContentItemLoadingObject,
                childContentItemLoadingObject,
                childContentItemLoadingObject,
              ],
            },
          }}
        />
      )}
    </Query>
  </BackgroundView>
);

DiscoverScreen.navigationOptions = {
  title: 'Discover',
};

export const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScreen,
  },
  {
    initialRouteName: 'Discover',
  }
);

DiscoverStack.navigationOptions = {
  tabBarIcon: tabBarIcon('sections'),
};

export default DiscoverStack;
