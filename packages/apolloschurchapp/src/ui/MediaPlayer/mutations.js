import gql from 'graphql-tag';

const playVideoMutation = gql`
  mutation playVideo(
    $mediaSource: String!
    $posterSources: String
    $title: String
    $artist: String
    $isVideo: Boolean
  ) {
    mediaPlayerPlayNow(
      mediaSource: $mediaSource
      posterSources: $posterSources
      title: $title
      artist: $artist
      isVideo: $isVideo
    ) @client
  }
`;

const goFullscreen = gql`
  mutation {
    mediaPlayerUpdateState(isFullscreen: true) @client
  }
`;

const play = gql`
  mutation {
    mediaPlayerUpdateState(isPlaying: true) @client
  }
`;

const pause = gql`
  mutation {
    mediaPlayerUpdateState(isPlaying: false) @client
  }
`;

const dismiss = gql`
  mutation {
    mediaPlayerUpdateState(isPlaying: false, isVisible: false) @client
  }
`;

const pauseAndRestart = gql`
  mutation pause {
    mediaPlayerUpdateState(isPlaying: false) @client
    mediaPlayerSetPlayhead(currentTime: 0) @client
  }
`;

const exitFullscreen = gql`
  mutation {
    mediaPlayerUpdateState(isFullscreen: false) @client
  }
`;

const updatePlayhead = gql`
  mutation mediaPlayerSetPlayhead($currentTime: Float) {
    mediaPlayerSetPlayhead(currentTime: $currentTime) @client
  }
`;

export {
  pauseAndRestart,
  playVideoMutation,
  goFullscreen,
  play,
  pause,
  dismiss,
  exitFullscreen,
  updatePlayhead,
};
