import gql from 'graphql-tag';

import { contentItemFragment } from 'apolloschurchapp/src/content-single/getContentItem';

export default gql`
  query getAllLikedContent {
    getAllLikedContent {
      ... on ContentItem {
        ...contentItemFragment
      }
    }
  }
  ${contentItemFragment}
`;
