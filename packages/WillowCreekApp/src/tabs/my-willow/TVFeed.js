import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { get } from 'lodash';
import { HorizontalTileFeed, TouchableScale } from '@apollosproject/ui-kit';
import FeaturedContentCardConnected from 'WillowCreekApp/src/ui/FeaturedContentCardConnected';

import getTVFeed from './getTVFeed';

class TVFeed extends Component {
  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <Query query={getTVFeed} fetchPolicy="cache-and-network">
        {({ loading, data }) => (
          <HorizontalTileFeed
            content={get(data, 'tvFeed.edges', []).map((edge) => edge.node)}
            snapToInterval={Dimensions.get('window').width * 0.85 + 17}
            renderItem={({ item }) => (
              <TouchableScale onPress={() => this.handleOnPress(item)}>
                <FeaturedContentCardConnected
                  contentId={item.id}
                  isLoading={loading}
                  inHorizontalList
                />
              </TouchableScale>
            )}
            loadingStateObject={{
              id: 'fake_id',
              title: '',
              coverImage: [],
            }}
            isLoading={loading}
          />
        )}
      </Query>
    );
  }
}

export default withNavigation(TVFeed);
