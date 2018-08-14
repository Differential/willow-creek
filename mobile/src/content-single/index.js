import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard } from '/mobile/ui/Card';
import CardTile from '/mobile/ui/CardTile';
import VideoPlayer from '/mobile/ui/VideoPlayer';
import HorizontalTileFeed from '/mobile/ui/HorizontalTileFeed';
import HTMLView from '/mobile/ui/HTMLView';
import PaddedView from '/mobile/ui/PaddedView';
import { H2 } from '/mobile/ui/typography';
import BackgroundView from '/mobile/ui/BackgroundView';
import styled from '/mobile/ui/styled';
import { ThemeMixin } from '/mobile/ui/theme';
import Share from '/mobile/ui/Share';

import getContentItem from './getContentItem.graphql';
import getContentItemMinimalState from './getContentItemMinimalState.graphql';

const FeedContainer = styled({
  paddingHorizontal: 0,
})(PaddedView);

const ContentContainer = styled({ paddingVertical: 0 })(PaddedView);

class ContentSingle extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', 'Content');
    const shareObject = {
      title: itemTitle,
      url: 'https://github.com/ApollosProject/apollos-prototype',
      message: 'Share this with all your friends and family',
    };
    return {
      title: itemTitle,
      headerRight: <Share content={shareObject} />,
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
          <Query
            query={getContentItem}
            variables={this.itemId}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data }) => {
              if (error) return <ErrorCard error={error} />;

              const content = {
                ...((cachedData && cachedData.node) || {}),
                ...((data && data.node) || {}),
              };

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

              const horizontalContent = siblingContent.length
                ? siblingContent
                : childContent;

              return (
                <ThemeMixin
                  mixin={{
                    type: get(content, 'theme.type', 'light').toLowerCase(),
                    colors: get(content, 'theme.colors'),
                  }}
                >
                  <ScrollView>
                    <VideoPlayer
                      source={get(content, 'videos[0].sources[0]', null)}
                      thumbnail={get(content, 'coverImage.sources', [])}
                      overlayColor={get(content, 'theme.colors.paper')}
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
                    {(horizontalContent && horizontalContent.length) ||
                    loading ? (
                      <FeedContainer>
                        <HorizontalTileFeed
                          content={horizontalContent}
                          isLoading={loading}
                          loadingStateObject={this.loadingStateObject}
                          renderItem={this.renderItem}
                        />
                      </FeedContainer>
                    ) : null}
                  </ScrollView>
                </ThemeMixin>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}

export default ContentSingle;
