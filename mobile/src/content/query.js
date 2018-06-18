import gql from 'graphql-tag';

const GET_CONTENT = gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentItem {
        id
        title
        htmlContent
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

export default GET_CONTENT;
