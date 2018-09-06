import { gql } from 'apollo-server';

export default gql`
  type Scripture {
    reference: String
    content: String
  }
`;
