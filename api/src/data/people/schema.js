import { gql } from 'apollo-server';

export default gql`
  type Person implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    nickName: String
    email: String
  }
`;
