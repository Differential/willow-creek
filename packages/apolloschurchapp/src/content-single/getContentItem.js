import gql from 'graphql-tag';

export default gql`
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
        theme {
          type
          colors {
            primary
            secondary
            screen
            paper
          }
        }
        videos {
          sources {
            uri
          }
        }
        childContentItemsConnection {
          edges {
            node {
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
        siblingContentItemsConnection {
          edges {
            node {
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
