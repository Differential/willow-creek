import { gql } from 'apollo-server';

export default gql`
  type Interaction implements Node {
    id: ID!
    operation: LIKE_OPERATION!
    interactionDateTime: String!
  }

  enum LIKE_OPERATION {
    Like
    Unlike
  }

  input LikeEntityInput {
    nodeId: ID!
    operation: LIKE_OPERATION!
  }

  extend type Mutation {
    updateLikeEntity(input: LikeEntityInput!): Interaction
  }
`;
