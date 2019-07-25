import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { View, StyleSheet } from 'react-native';
import { get } from 'lodash';

import { PLAY_VIDEO } from '@apollosproject/ui-media-player';
import {
  H6,
  Icon,
  styled,
  Button,
  ConnectedImage,
} from '@apollosproject/ui-kit';
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

  renderControls = ({
    loading,
    error,
    data: {
      node: { videos, title, parentChannel = {}, coverImage = {} } = {},
    } = {},
  }) => {
    if (loading || error) return null;

    const video = get(videos, '[0]') || null;
    let videoSource;
    if (video && video.youtubeId) {
      videoSource = { uri: video.youtubeId, __typename: 'YoutubeVideoSource' };
    } else {
      videoSource = get(video, 'sources[0]', null);
    }

    const coverImageSources = (coverImage && coverImage.sources) || [];

    return (
      <Mutation mutation={PLAY_VIDEO}>
        {(play) => (
          <Container>
            {videoSource ? (
              <MediaButton
                type="secondary"
                onPress={() =>
                  play({
                    variables: {
                      mediaSource: videoSource,
                      posterSources: coverImageSources,
                      title,
                      isVideo: true,
                      artist: parentChannel.name,
                    },
                  })
                }
              >
                <MediaImage source={coverImage.sources} />
                <MediaIcon name="play" />
                <H6>Play</H6>
              </MediaButton>
            ) : null}
          </Container>
        )}
      </Mutation>
    );
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
