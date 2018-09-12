import gql from 'graphql-tag';

export default gql`
  query sessionId {
    sessionId @client
  }
`;
