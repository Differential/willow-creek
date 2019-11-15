import gql from 'graphql-tag';

export default gql`
  query getUserFirstName {
    currentUser {
      id
      profile {
        id
        firstName
        lastName
        email
      }
    }
    authStatus @client
  }
`;
