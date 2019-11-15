import gql from 'graphql-tag';

import { BASE_CARD_FRAGMENT } from 'WillowCreekApp/src/ui/ContentCardConnected';

export default gql`
  query getContentFeed($itemId: ID!, $after: String, $first: Int) {
    node(id: $itemId) {
      ... on ContentChannel {
        childContentItemsConnection(after: $after, first: $first) {
          pageInfo {
            endCursor
          }
          edges {
            node {
              ...baseCardFragment
              ...contentItemFragment
            }
          }
        }
      }
    }
  }
  ${BASE_CARD_FRAGMENT}
`;
