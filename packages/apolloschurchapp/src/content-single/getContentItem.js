import gql from 'graphql-tag';

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentItem {
        id
        title
        isLiked
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
        audios {
          sources {
            uri
          }
        }
        parentChannel {
          id
          name
        }
        sharing {
          url
          message
          title
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
              sharing {
                url
                message
                title
              }
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
              sharing {
                url
                message
                title
              }
            }
          }
        }
      }
    }
  }
`;
