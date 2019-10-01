import gql from 'graphql-tag';

export default gql`
  query getLiveStream {
    liveStream {
      isLive
      stream {
        sources {
          uri
        }
        #        label
        #        thumbnail {
        #          uri
        #        }
      }
    }
  }
`;
