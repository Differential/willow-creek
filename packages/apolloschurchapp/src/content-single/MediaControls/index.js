import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { View } from 'react-native';
import { get } from 'lodash';

import { playVideoMutation } from 'apolloschurchapp/src/ui/MediaPlayer/mutations';
import Icon from 'apolloschurchapp/src/ui/Icon';
import TouchableScale from 'apolloschurchapp/src/ui/TouchableScale';
import styled from 'apolloschurchapp/src/ui/styled';
import getContentMedia from './getContentMedia';

const buttonSizeDifferential = 3.5;

const MediaIcon = Icon; // todo: add back styles
const MediaButton = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * buttonSizeDifferential,
  height: theme.sizing.baseUnit * buttonSizeDifferential,
  borderRadius: theme.sizing.baseUnit * (buttonSizeDifferential / 2),
  overflow: 'hidden',
  backgroundColor: theme.colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: buttonSizeDifferential,
  borderColor: theme.colors.paper,
  marginHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const Container = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -theme.sizing.baseUnit * (buttonSizeDifferential / 2),
}))(View);

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

    const videoSource = get(videos, '[0].sources[0]', null);
    const coverImageSources = (coverImage && coverImage.sources) || [];

    return (
      <Mutation mutation={playVideoMutation}>
        {(play) => (
          <Container>
            {videoSource ? (
              <TouchableScale
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
                <MediaButton>
                  <MediaIcon name="play" />
                </MediaButton>
              </TouchableScale>
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
        query={getContentMedia}
        variables={{ contentId: this.props.contentId }}
      >
        {this.renderControls}
      </Query>
    );
  }
}

export default MediaControls;
