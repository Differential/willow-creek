import gql from 'graphql-tag';

import { CONTENT_ITEM_FRAGMENT } from 'WillowCreekApp/src/content-single/getContentItem';
import { LARGE_CARD_FRAGMENT } from 'WillowCreekApp/src/ui/ContentCardConnected';

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
            ...largeCardFragment
          }
        }
      }
    }
  }
  ${CONTENT_ITEM_FRAGMENT}
  ${LARGE_CARD_FRAGMENT}
`;
