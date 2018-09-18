import { gql } from 'apollo-server';

export default gql`
  type Session implements Node {
    id: ID!
  }

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
    sessionId: ID!
    operation: LIKE_OPERATION!
  }

  extend type Mutation {
    updateLikeEntity(input: LikeEntityInput!): Interaction
    createSession: Session
  }
`;
