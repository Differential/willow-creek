import { gql } from 'apollo-server';

export default gql`
  type LiveStream {
    isLive: Boolean
    eventStartTime: String
    stream: VideoMedia
  }

  extend type Query {
    liveStream: LiveStream
  }
`;
