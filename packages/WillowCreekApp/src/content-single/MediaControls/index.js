import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { View, StyleSheet } from 'react-native';
import { get } from 'lodash';

import { PLAY_VIDEO } from '@apollosproject/ui-media-player';
import {
  Icon,
  styled,
  Button,
  ConnectedImage,
  H6,
} from '@apollosproject/ui-kit';

import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';
import GET_CONTENT_MEDIA from './getContentMedia';

const buttonSizeDifferential = 5;

const MediaIcon = Icon;

const MediaButton = styled(({ theme }) => ({
  aspectRatio: 16 / 9,
  height: theme.sizing.baseUnit * buttonSizeDifferential,
  borderRadius: theme.sizing.baseUnit,
  backgroundColor: theme.colors.black,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 0, // remove default button border
  marginBottom:
    -(theme.sizing.baseUnit * buttonSizeDifferential) / 2 -
    theme.sizing.baseUnit * 2,
}))(Button);

const MediaButtonBorder = styled(({ theme }) => ({
  borderRadius:
    theme.sizing.baseUnit * (buttonSizeDifferential / 2) +
    buttonSizeDifferential, // this is eqivalent to the MediaButton size above + the padding below
  padding: buttonSizeDifferential, // padding + backgroundColor = MediaButton + "borderStyles"
  backgroundColor: theme.colors.paper,
}))(View);

const MediaImage = styled(({ theme }) => ({
  opacity: theme.alpha.low,
  ...StyleSheet.absoluteFillObject,
}))(ConnectedImage);

const Container = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

class MediaControls extends PureComponent {
  static propTypes = {
    contentId: PropTypes.string,
  };

  renderMedia = ({
    videoSource,
    coverImageSources,
    title,
    parentChannelName,
  }) => (
    <Mutation mutation={PLAY_VIDEO}>
      {(play) => (
        <Container>
          <MediaButtonBorder>
            <MediaButton
              type="primary"
              onPress={() =>
                play({
                  variables: {
                    mediaSource: videoSource,
                    posterSources: coverImageSources,
                    title,
                    isVideo: true,
                    artist: parentChannelName,
                  },
                })
              }
              useForeground
            >
              <MediaImage source={coverImageSources} />
              <MediaIcon name="play" />
              <H6>Play</H6>
            </MediaButton>
          </MediaButtonBorder>
        </Container>
      )}
    </Mutation>
  );

  renderWebView = ({ webViewUrl }) => (
    <WebBrowserConsumer>
      {(openUrl) => (
        <Container>
          <MediaButtonBorder>
            <MediaButton
              type="primary"
              onPress={() => openUrl(webViewUrl)}
              useForeground
            >
              <MediaIcon name="play" />
            </MediaButton>
          </MediaButtonBorder>
        </Container>
      )}
    </WebBrowserConsumer>
  );

  renderControls = ({
    loading,
    error,
    data: {
      node: {
        videos,
        title,
        parentChannel = {},
        coverImage = {},
        liveStream = {},
      } = {},
    } = {},
  }) => {
    if (loading || error) return null;

    const isLive = get(liveStream, 'isLive', false);
    const hasLiveStreamContent = !!(
      get(liveStream, 'webViewUrl') || get(liveStream, 'media.sources[0]')
    );

    let videoSource;
    if (get(videos, '[0].youtubeId', null)) {
      videoSource = {
        uri: videos[0].youtubeId,
        __typename: 'YoutubeVideoSource',
      };
    } else {
      videoSource = get(videos, '[0].sources[0]', null);
    }
    const shouldRender = (isLive && hasLiveStreamContent) || videoSource;

    if (!shouldRender) return null;

    const coverImageSources = (coverImage && coverImage.sources) || [];

    // Content is live, and we have a livestream media
    if (isLive && get(liveStream, 'media.sources[0].uri')) {
      return this.renderMedia({
        coverImageSources,
        videoSource: liveStream.media.sources[0],
        parentChannelName: parentChannel.name,
        title,
      });
    }

    // Content is live, and we don't have a livestream media
    // but we do have a webview url
    if (isLive && get(liveStream, 'webViewUrl')) {
      return this.renderWebView({
        webViewUrl: liveStream.webViewUrl,
      });
    }

    // Default case, normal media.
    return this.renderMedia({
      coverImageSources,
      videoSource,
      parentChannelName: parentChannel.name,
      title,
    });
  };

  render() {
    if (!this.props.contentId) return null;
    return (
      <Query
        query={GET_CONTENT_MEDIA}
        variables={{ contentId: this.props.contentId }}
      >
        {this.renderControls}
      </Query>
    );
  }
}

export default MediaControls;
