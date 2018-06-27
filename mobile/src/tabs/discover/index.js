import React from 'react';
import { Query } from 'react-apollo';
import { Button, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import BackgroundView from 'ui/BackgroundView';
import { ErrorCard } from 'ui/Card';
import tabBarIcon from '../tabBarIcon';
import GET_DISCOVER_ITEMS from './query';

export class DiscoverScreen extends React.Component {
  static navigationOptions = {
    title: 'Discover',
  };

  static propTypes = {
    fetchMore: PropTypes.func,
    keyExtractor: PropTypes.func,
    ListEmptyComponent: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    onEndReachedThreshold: PropTypes.number,
  };

  static defaultProps = {
    fetchMore: undefined,
    keyExtractor: (item) => item && item.id,
    onEndReachedThreshold: 0.7,
  };

  refetchHandler = ({ isLoading, refetch }) =>
    refetch && ((...args) => !isLoading && refetch(...args));

  fetchMoreHandler = ({ fetchMore, error, isLoading }) =>
    fetchMore && ((...args) => !isLoading && !error && fetchMore(...args));

  render() {
    const {
      fetchMore,
      keyExtractor,
      ListEmptyComponent,
      onEndReachedThreshold,
    } = this.props;
    return (
      <BackgroundView>
        <Query query={GET_DISCOVER_ITEMS}>
          {({ loading, error, data, refetch }) => {
            if (loading) return 'Loading...';

            return (
              <FlatList
                data={get(data, 'contentChannels', [])}
                keyExtractor={keyExtractor}
                ListEmptyComponent={
                  error && !loading && (!data || !data.length) ? (
                    <ErrorCard error={error} />
                  ) : (
                    ListEmptyComponent
                  )
                }
                renderItem={({ item }) => (
                  <Button
                    title={item.name}
                    onPress={() => {
                      this.props.navigation.navigate('ContentFeed', {
                        itemId: item.id,
                        itemTitle: item.name,
                      });
                    }}
                  />
                )}
                onEndReached={this.fetchMoreHandler({
                  fetchMore,
                  error,
                  loading,
                })}
                onEndReachedThreshold={onEndReachedThreshold}
                onRefresh={this.refetchHandler({ loading, refetch })}
                refreshing={loading}
              />
            );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

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
