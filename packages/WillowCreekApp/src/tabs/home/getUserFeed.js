import gql from 'graphql-tag';

import { contentItemFragment } from 'WillowCreekApp/src/content-single/getContentItem';
import { largeCardFragment } from 'WillowCreekApp/src/ui/ContentCardConnected';

export default gql`
  query getUserFeed($first: Int, $after: String) {
    userFeed(first: $first, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          ...largeCardFragment
          ...contentItemFragment
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
