import gql from 'graphql-tag';

import { contentItemFragment } from 'apolloschurchapp/src/content-single/getContentItem';

export default gql`
  query getContentChannels {
    contentChannels {
      id
      name
      childContentItemsConnection(first: 3) {
        edges {
          node {
            id
            ...contentItemFragment
            title
            coverImage {
              sources {
                uri
              }
            }
            sharing {
              title
              message
              url
            }
          }
        }
      }
    }
  }
  ${contentItemFragment}
`;
