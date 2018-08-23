import gql from 'graphql-tag';

export default gql`
  query {
    isLoggedIn: authToken @client
  }
`;
