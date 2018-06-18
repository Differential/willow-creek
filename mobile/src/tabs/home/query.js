import gql from 'graphql-tag';

const GET_USER_FEED = gql`
  {
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
          title
        }
      }
    }
  }
`;

export default GET_USER_FEED;
