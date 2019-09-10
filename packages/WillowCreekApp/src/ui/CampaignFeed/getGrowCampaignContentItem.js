import gql from 'graphql-tag';

import { CONTENT_ITEM_FRAGMENT } from 'WillowCreekApp/src/content-single/getContentItem';
import { LARGE_CARD_FRAGMENT } from 'WillowCreekApp/src/ui/ContentCardConnected';

export default gql`
  query growCampaign {
    growCampaign {
      edges {
        node {
          childContentItemsConnection {
            edges {
              node {
                ...largeCardFragment
                ...contentItemFragment
              }
            }
          }
        }
      }
    }
  }
  ${CONTENT_ITEM_FRAGMENT}
  ${LARGE_CARD_FRAGMENT}
`;
