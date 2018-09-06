import { gql } from 'apollo-server';

export default gql`
  type Scripture {
    reference: String
    content: String
  }

  extend type Query {
    scripture(query: String!): Scripture
  }
`;
