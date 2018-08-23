import gql from 'graphql-tag';

export default gql`
  mutation registerPerson($email: String!, $password: String!) {
    registerPerson(email: $email, password: $password) {
      token
    }
  }
`;
