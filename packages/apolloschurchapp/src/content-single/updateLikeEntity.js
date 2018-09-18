import gql from 'graphql-tag';

export default gql`
  mutation updateLikeEntity(
    $itemId: ID!
    $sessionId: ID!
    $operation: LIKE_OPERATION!
  ) {
    updateLikeEntity(
      input: { nodeId: $itemId, sessionId: $sessionId, operation: $operation }
    ) {
      id
      operation
      interactionDateTime
    }
  }
`;
