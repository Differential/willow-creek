import { gql } from 'apollo-server';

export default gql`
  type LiveStream {
    isLiveNow: Boolean!
  }
`;
