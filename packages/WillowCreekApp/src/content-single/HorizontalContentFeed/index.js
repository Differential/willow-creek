import React, { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';

import {
  PaddedView,
  HorizontalTileFeed,
  TouchableScale,
  H5,
} from '@apollosproject/ui-kit';

import ContentCardConnected from 'WillowCreekApp/src/ui/ContentCardConnected';
import GET_HORIZONTAL_CONTENT from './getHorizontalContent';

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    isLoading: true,
  },
};

class HorizontalContentFeed extends Component {
  static propTypes = {
    contentId: PropTypes.string,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  handleOnPressItem = (item) => {
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
    });
  };

  renderItem = ({ item, index }) => (
    <TouchableScale onPress={() => this.handleOnPressItem(item)}>
      <ContentCardConnected
        tile
        contentId={item.id}
        inHorizontalList
        /*
         * These are props that are not yet being passed in the data.
         * We will need to make sure they get added back when that data is available.
         * byLine={item.content.speaker}
         * date={item.meta.date}
         */
      />
    </TouchableScale>
  );

  renderFeed = ({ data, loading, error }) => {
    if (error) return null;
    if (loading) return null;

    const childContent = get(
      data,
      'node.childContentItemsConnection.edges',
      []
    ).map((edge) => edge.node);

    const siblingContent = get(
      data,
      'node.siblingContentItemsConnection.edges',
      []
    ).map((edge) => edge.node);

    const content = siblingContent.length ? siblingContent : childContent;

    return (content && content.length) || loading ? (
      <>
        <PaddedView vertical={false}>
          <H5>You might also like</H5>
        </PaddedView>
        <HorizontalTileFeed
          content={content}
          isLoading={loading}
          loadingStateObject={loadingStateObject}
          renderItem={this.renderItem}
        />
      </>
    ) : null;
  };

  render() {
    if (!this.props.contentId) return this.renderFeed({ loading: true });

    return (
      <Query
        query={GET_HORIZONTAL_CONTENT}
        variables={{ itemId: this.props.contentId }}
      >
        {this.renderFeed}
      </Query>
    );
  }
}

export default withNavigation(HorizontalContentFeed);
