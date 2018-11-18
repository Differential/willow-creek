import { gql } from 'apollo-server';

export const schema = gql`
  type PaginationInfo {
    startCursor: String
    endCursor: String
  }
`;

export const resolver = {
  PaginationInfo: {},
};
