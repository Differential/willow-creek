import gql from 'graphql-tag';

export default gql`
  # This query is likely to get a cache hit, making it sooner to render content
  query getContentItemMinimalState($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentItem {
        id
        title
        coverImage {
          name
          sources {
            uri
          }
        }
      }
    }
  }
`;
