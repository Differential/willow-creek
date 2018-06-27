import gql from 'graphql-tag';

const GET_CONTENT_FEED = gql`
  query getContentFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentChannel {
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

export default GET_CONTENT_FEED;
