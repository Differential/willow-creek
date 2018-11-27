import React, { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import {
  ContentCard,
  HorizontalTileFeed,
  PaddedView,
  styled,
  TouchableScale,
  H5,
} from '@apollosproject/ui-kit';

import getAdditionalFeatures from './getAdditionalFeatures';

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    isLoading: true,
  },
};

const LabelContainer = styled(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(PaddedView);

class AdditionalFeatures extends Component {
  static propTypes = {
    contentId: PropTypes.string,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  handleOnPressItem = () => null;

  renderItem = ({ item }) => (
    <TouchableScale onPress={() => this.handleOnPressItem(item)}>
      <ContentCard
        coverImage={item.thumbnail}
        tile
        inHorizontalList
        footer={
          <LabelContainer>
            <H5>{item.label}</H5>
          </LabelContainer>
        }
      />
    </TouchableScale>
  );

  renderFeed = ({ data, loading, error }) => {
    if (error) return null;
    const content = get(data, 'node.videos', []).slice(1);

    return (content && content.length) || loading ? (
      <PaddedView horizontal={false}>
        <PaddedView style={{ paddingBottom: 0 }}>
          <H5>Jump to</H5>
        </PaddedView>
        <HorizontalTileFeed
          content={content}
          isLoading={loading}
          loadingStateObject={loadingStateObject}
          keyExtractor={({ label }) => label}
          renderItem={this.renderItem}
        />
      </PaddedView>
    ) : null;
  };

  render() {
    if (!this.props.contentId) return this.renderFeed({ loading: true });

    return (
      <Query
        query={getAdditionalFeatures}
        variables={{ itemId: this.props.contentId }}
      >
        {this.renderFeed}
      </Query>
    );
  }
}

export default AdditionalFeatures;
