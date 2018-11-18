import gql from 'graphql-tag';

export default gql`
  query {
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
