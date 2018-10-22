import { gql } from 'apollo-server';

export default gql`
  type Scripture {
    id: String
    html: String
    reference: String
    copyright: String
  }

  extend type Query {
    scripture(query: String!): Scripture
  }
`;
