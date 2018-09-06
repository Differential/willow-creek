import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    node(id: ID!): Node
  }

  interface Node {
    id: ID!
  }
`;
