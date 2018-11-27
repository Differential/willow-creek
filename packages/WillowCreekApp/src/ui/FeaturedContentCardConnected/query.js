import gql from 'graphql-tag';

export default gql`
  query getContentCard($contentId: ID!) {
    node(id: $contentId) {
      id
      __typename
      coverImage {
        sources {
          uri
        }
      }
      title
      summary
      isLiked
      likedCount
    }
  }
`;
