import React, { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';

import { HorizontalTileFeed, TouchableScale } from '@apollosproject/ui-kit';

import HorizontalContentCardConnected from '../../ui/HorizontalContentCardConnected';

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

  renderItem = ({ item }) => (
    <TouchableScale onPress={() => this.handleOnPressItem(item)}>
      <HorizontalContentCardConnected contentId={get(item, 'id', '')} />
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
    const currentIndex = content.findIndex(
      ({ id }) => id === this.props.contentId
    );
    const initialScrollIndex = currentIndex === -1 ? 0 : currentIndex;

    return content && content.length ? (
      <HorizontalTileFeed
        content={content}
        loadingStateObject={loadingStateObject}
        renderItem={this.renderItem}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(itemData, index) => ({
          // We need to pass this function so that initialScrollIndex will work.
          length: 240,
          offset: 240 * index,
          index,
        })}
      />
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
