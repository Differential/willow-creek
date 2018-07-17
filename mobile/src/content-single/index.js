import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard } from 'ui/Card';
import CardTile from 'ui/CardTile';
import GradientOverlayImage from 'ui/GradientOverlayImage';
import HorizontalTileFeed from 'ui/HorizontalTileFeed';
import HTMLView from 'ui/HTMLView';
import PaddedView from 'ui/PaddedView';
import { H2 } from 'ui/typography';
import BackgroundView from 'ui/BackgroundView';
import styled from 'ui/styled';

import getContentItem from './getContentItem.graphql';
import getContentItemMinimalState from './getContentItemMinimalState.graphql';

const FeedContainer = styled({
  paddingHorizontal: 0,
})(PaddedView);

const ContentContainer = styled({ paddingVertical: 0 })(PaddedView);

class ContentSingle extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', 'Content');
    return {
      title: itemTitle,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.itemId = { itemId: props.navigation.getParam('itemId', []) };
    this.loadingStateObject = {
      node: {
        id: 'fakeId0',
        title: '',
        isLoading: true,
      },
    };
  }

  handleOnPressItem(item) {
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
      itemTitle: item.title,
    });
  }

  renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => this.handleOnPressItem(item)}>
      <CardTile
        number={index + 1}
        title={get(item, 'title', '')}
        /*
          * These are props that are not yet being passed in the data.
          * We will need to make sure they get added back when that data is available.
          * byLine={item.content.speaker}
          * date={item.meta.date}
          */
        isLoading={item.isLoading}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <Query
        query={getContentItemMinimalState}
        variables={this.itemId}
        fetchPolicy="cache-only"
      >
        {({ data: cachedData }) => (
          <Query query={getContentItem} variables={this.itemId}>
            {({ loading, error, data }) => {
              const content = {
                ...(cachedData.node || {}),
                ...(data.node || {}),
              };

              if (error) return <ErrorCard error={error} />;
              const childContent = get(
                data,
                'node.childContentItemsConnection.edges',
                []
              ).map((edge) => edge.node);

              return (
                <ScrollView>
                  <GradientOverlayImage
                    source={get(content, 'coverImage.sources', [])}
                  />
                  <BackgroundView>
                    <ContentContainer>
                      <H2 padded isLoading={!content.title && loading}>
                        {content.title}
                      </H2>
                      <HTMLView isLoading={!content.htmlContent && loading}>
                        {content.htmlContent}
                      </HTMLView>
                    </ContentContainer>
                  </BackgroundView>
                  {(childContent && childContent.length) || loading ? (
                    <FeedContainer>
                      <HorizontalTileFeed
                        content={childContent}
                        isLoading={loading}
                        loadingStateObject={this.loadingStateObject}
                        renderItem={this.renderItem}
                      />
                    </FeedContainer>
                  ) : null}
                </ScrollView>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}

export default ContentSingle;
