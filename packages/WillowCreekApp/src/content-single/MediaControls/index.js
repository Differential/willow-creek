import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { View } from 'react-native';
import { get } from 'lodash';

import { playVideoMutation } from 'WillowCreekApp/src/ui/MediaPlayer/mutations';
import { Icon, styled, Button, H6, withTheme } from '@apollosproject/ui-kit';
import getContentMedia from './getContentMedia';

const buttonSizeDifferential = 2;

const MediaIcon = withTheme(({ theme }) => ({
  size: theme.sizing.baseUnit * (buttonSizeDifferential / 2),
}))(Icon); // todo: add back styles

const MediaButton = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  height: theme.sizing.baseUnit * buttonSizeDifferential,
  borderRadius: theme.sizing.baseUnit * (buttonSizeDifferential / 2),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 0, // remove default button border
}))(Button);

const MediaTitle = styled(({ theme }) => ({
  paddingLeft: theme.sizing.baseUnit / 4,
  paddingTop: 3,
}))(H6);

/** MediaButtton "border styles" live in a seperate component so that Android places it's elevation
 * shadow in the right place. */
const MediaButtonBorder = styled(({ theme }) => ({
  borderRadius:
    theme.sizing.baseUnit * (buttonSizeDifferential / 2) +
    buttonSizeDifferential, // this is eqivalent to the MediaButton size above + the padding below
  padding: buttonSizeDifferential, // padding + backgroundColor = MediaButton + "borderStyles"
  backgroundColor: theme.colors.paper,
}))(View);

const Container = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: theme.sizing.baseUnit,
  marginTop:
    -theme.sizing.baseUnit * (buttonSizeDifferential / 2) -
    buttonSizeDifferential, // MediaButton size / 2 + border
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
              <MediaButtonBorder>
                <MediaButton
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
                  useForeground
                >
                  <>
                    <MediaIcon name="play" />
                    <MediaTitle>Watch</MediaTitle>
                  </>
                </MediaButton>
              </MediaButtonBorder>
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
