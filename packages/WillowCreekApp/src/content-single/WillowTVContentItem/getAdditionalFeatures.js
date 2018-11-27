import gql from 'graphql-tag';

export default gql`
  query getAdditionalFeatures($itemId: ID!) {
    node(id: $itemId) {
      ... on WillowTVContentItem {
        id
        videos {
          label
          thumbnail {
            uri
          }
          sources {
            uri
          }
        }
      }
    }
  }
`;
