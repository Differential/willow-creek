import gql from 'graphql-tag';

export default gql`
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
