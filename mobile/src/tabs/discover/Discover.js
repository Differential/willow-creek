import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import FeedView from '/mobile/ui/FeedView';
import BackgroundView from '/mobile/ui/BackgroundView';

import TileContentFeed from './TileContentFeed';
import getContentChannels from './getContentChannels.graphql';

const childContentItemLoadingState = {
  title: '',
  isLoading: true,
};

const feedItemLoadingState = {
  name: '',
  isLoading: true,
};

class Discover extends PureComponent {
  renderItem = ({ item }) => (
    <TileContentFeed
      id={item.id}
      name={item.name}
      content={get(item, 'childContentItemsConnection.edges', []).map(
        (edge) => edge.node
      )}
      isLoading={item.isLoading}
      loadingStateObject={childContentItemLoadingState}
    />
  );

  render() {
    return (
      <BackgroundView>
        <Query query={getContentChannels}>
          {({
            error,
            loading,
            data: { contentChannels = [] } = {},
            refetch,
          }) => (
            <FeedView
              error={error}
              content={contentChannels}
              isLoading={loading}
              refetch={refetch}
              renderItem={this.renderItem}
              loadingStateObject={feedItemLoadingState}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

Discover.navigationOptions = {
  title: 'Discover',
};

export default Discover;
