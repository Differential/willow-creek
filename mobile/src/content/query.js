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
        childContentItemsConnection {
          edges {
            node {
              __typename
              id
              coverImage {
                name
                sources {
                  uri
                }
              }
              parentChannel {
                id
                name
                iconName
              }
              title
            }
          }
        }
      }
    }
  }
`;

export default GET_CONTENT;
