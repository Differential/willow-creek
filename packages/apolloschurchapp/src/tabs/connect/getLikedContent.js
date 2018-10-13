import gql from 'graphql-tag';

export default gql`
  query getAllLikedContent {
    getAllLikedContent {
      ... on ContentItem {
        id
        title
        coverImage {
          sources {
            uri
          }
        }
        sharing {
          title
          message
          url
        }
      }
    }
  }
`;
