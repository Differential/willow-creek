import { gql } from 'apollo-server';

export default gql`
  type Scripture {
    reference: String
    html: String
    copyright: String
  }

  extend type Query {
    scripture(query: String!): Scripture
  }
`;
