import gql from 'graphql-tag';

export default gql`
  query getUserProfile {
    isLoggedIn @client
    currentUser {
      id
      profile {
        firstName
        lastName
        location
        email
        nickName
        photo {
          uri
        }
      }
    }
  }
`;
