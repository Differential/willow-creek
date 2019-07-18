import gql from 'graphql-tag';

const getUserCampus = gql`
  query {
    currentUser {
      id
      profile {
        id
        campus {
          id
          name
        }
      }
    }
  }
`;

export default getUserCampus;
