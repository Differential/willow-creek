import gql from 'graphql-tag';

export default gql`
  mutation createInteraction(
    $itemId: ID!
    $sessionId: ID!
    $operation: INTERACTION_OPERATION!
  ) {
    createInteraction(
      input: { nodeId: $itemId, sessionId: $sessionId, operation: $operation }
    ) {
      id
      operation
      interactionDateTime
    }
  }
`;
