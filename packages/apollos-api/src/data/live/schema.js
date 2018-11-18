import { gql } from 'apollo-server';

export default gql`
  type LiveStream {
    isLive: Boolean
    eventStartTime: String
  }

  extend type Query {
    liveStream: LiveStream
  }
`;
