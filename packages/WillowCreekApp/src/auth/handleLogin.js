import gql from 'graphql-tag';

export default gql`
  mutation handleLogin($authToken: String!) {
    handleLogin(authToken: $authToken) @client
  }
`;
