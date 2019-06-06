import gql from 'graphql-tag';

import { largeCardFragment } from 'WillowCreekApp/src/ui/ContentCardConnected';
import { contentItemFragment } from '../content-single/getContentItem';

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
              ...contentItemFragment
              ...largeCardFragment
            }
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
