import gql from 'graphql-tag';

import { contentItemFragment } from 'WillowCreekApp/src/content-single/getContentItem';

export default gql`
  query getUserFeed {
    userFeed {
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
          parentChannel {
            id
            name
            iconName
          }
          theme {
            type
            colors {
              primary
              secondary
              screen
              paper
            }
          }
          isLiked
          title
        }
      }
    }
  }
  ${contentItemFragment}
`;
