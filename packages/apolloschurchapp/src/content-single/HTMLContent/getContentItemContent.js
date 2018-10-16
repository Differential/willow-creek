import gql from 'graphql-tag';

export default gql`
  query getContentItem($contentId: ID!) {
    node(id: $contentId) {
      ... on ContentItem {
        id
        htmlContent
      }
    }
  }
`;
