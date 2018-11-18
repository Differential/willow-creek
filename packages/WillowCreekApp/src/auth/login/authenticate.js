import gql from 'graphql-tag';

export default gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(identity: $email, password: $password) {
      token
    }
  }
`;
