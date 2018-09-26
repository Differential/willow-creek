import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard } from 'apolloschurchapp/src/ui/Card';
import CardTile from 'apolloschurchapp/src/ui/CardTile';
import GradientOverlayImage from 'apolloschurchapp/src/ui/GradientOverlayImage';
import HorizontalTileFeed from 'apolloschurchapp/src/ui/HorizontalTileFeed';
import HTMLView from 'apolloschurchapp/src/ui/HTMLView';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import { H2 } from 'apolloschurchapp/src/ui/typography';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import styled from 'apolloschurchapp/src/ui/styled';
import { ThemeMixin, withTheme } from 'apolloschurchapp/src/ui/theme';
import Icon from 'apolloschurchapp/src/ui/Icon';
import Touchable from 'apolloschurchapp/src/ui/Touchable';

import { playVideoMutation } from 'apolloschurchapp/src/ui/MediaPlayer/mutations';
import { events } from 'apolloschurchapp/src/analytics';
import TrackEventWhenLoaded from 'apolloschurchapp/src/analytics/TrackEventWhenLoaded';

import getContentItem from './getContentItem';
import getContentItemMinimalState from './getContentItemMinimalState';
import ActionContainer from './ActionContainer';

const FeedContainer = styled({
  paddingHorizontal: 0,
})(PaddedView);

const MediaButtonsContainer = styled({
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
})(PaddedView);

const MediaIcon = withTheme(
  ({ theme: { colors: { lightPrimary } = {} } = {} }) => ({
    size: 50, // TODO: should this be set in a typographic unit?
    fill: lightPrimary, // TODO: should this reference a text color?
  })
)(Icon);

const MediaHeader = styled({ width: '100%' })(View);

const ContentContainer = styled({ paddingVertical: 0 })(PaddedView);

class ContentSingle extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const shareObject = navigation.getParam('sharing', 'Content');
    const itemId = navigation.getParam('itemId', []);
    return {
      title: shareObject.title,
      headerRight: <ActionContainer itemId={itemId} content={shareObject} />,
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
      sharing: item.sharing,
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

              const videoSource = get(content, 'videos[0].sources[0]', null);
              const audioSource = get(content, 'audios[0].sources[0]', null);
              const coverImageSources = get(content, 'coverImage.sources', []);

              return (
                <ThemeMixin
                  mixin={{
                    type: get(content, 'theme.type', 'light').toLowerCase(),
                    colors: get(content, 'theme.colors'),
                  }}
                >
                  <TrackEventWhenLoaded
                    loaded={!!(!loading && content.title)}
                    eventName={events.ViewContent}
                    properties={{
                      title: content.title,
                      itemId: this.itemId.itemId,
                    }}
                  />
                  <ScrollView>
                    <MediaHeader>
                      <GradientOverlayImage
                        source={coverImageSources}
                        overlayColor={get(content, 'theme.colors.paper')}
                      />

                      <Mutation mutation={playVideoMutation}>
                        {(play) => (
                          <MediaButtonsContainer>
                            {videoSource ? (
                              <Touchable
                                onPress={() =>
                                  play({
                                    variables: {
                                      mediaSource: videoSource,
                                      posterSources: coverImageSources,
                                      title: content.title,
                                      isVideo: true,
                                      artist: get(
                                        content,
                                        'parentChannel.name'
                                      ),
                                    },
                                  })
                                }
                              >
                                <MediaIcon name="video" />
                              </Touchable>
                            ) : null}
                            {audioSource ? (
                              <Touchable
                                onPress={() =>
                                  play({
                                    variables: {
                                      mediaSource: audioSource,
                                      posterSources: coverImageSources,
                                      title: content.title,
                                      isVideo: false,
                                      artist: get(
                                        content,
                                        'parentChannel.name'
                                      ),
                                    },
                                  })
                                }
                              >
                                <MediaIcon name="audio" />
                              </Touchable>
                            ) : null}
                          </MediaButtonsContainer>
                        )}
                      </Mutation>
                    </MediaHeader>
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
