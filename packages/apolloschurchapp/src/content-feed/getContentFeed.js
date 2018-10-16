import gql from 'graphql-tag';

import { contentItemFragment } from '../content-single/getContentItem';

export default gql`
  query getContentFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentChannel {
        childContentItemsConnection {
          edges {
            node {
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
      }
    }
  }
  ${contentItemFragment}
`;
