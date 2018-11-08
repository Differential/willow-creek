import gql from 'graphql-tag';

export default gql`
  extend type Query {
    node(id: ID!): Node
  }

  interface Node {
    id: ID!
  }
`;
