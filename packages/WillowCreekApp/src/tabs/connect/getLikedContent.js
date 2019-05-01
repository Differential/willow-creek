import gql from 'graphql-tag';

import { largeCardFragment } from 'WillowCreekApp/src/ui/ContentCardConnected';
import { contentItemFragment } from 'WillowCreekApp/src/content-single/getContentItem';

export default gql`
  query getAllLikedContent($first: Int) {
    likedContent(first: $first) {
      edges {
        node {
          ... on ContentItem {
            ...contentItemFragment
            ...largeCardFragment
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
