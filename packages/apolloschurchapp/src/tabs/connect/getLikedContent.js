import gql from 'graphql-tag';

import { contentItemFragment } from 'apolloschurchapp/src/content-single/getContentItem';

export default gql`
  query getAllLikedContent {
    getAllLikedContent {
      ... on ContentItem {
        ...contentItemFragment
        __typename
        id
        coverImage {
          name
          sources {
            uri
          }
        }
        isLiked
        parentChannel {
          id
          name
          iconName
        }
        title
      }
    }
  }
  ${contentItemFragment}
`;
