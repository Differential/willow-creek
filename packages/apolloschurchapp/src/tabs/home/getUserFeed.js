import gql from 'graphql-tag';

export default gql`
  query getUserFeed {
    userFeed {
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
          sharing {
            title
            message
            url
          }
          title
        }
      }
    }
  }
`;
