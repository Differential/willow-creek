import gql from 'graphql-tag';

import { contentItemFragment } from 'WillowCreekApp/src/content-single/getContentItem';
import { tileCardFragment } from 'WillowCreekApp/src/ui/ContentCardConnected';

export default gql`
  query getUserFeed {
    userFeed {
      edges {
        node {
          id
          ...contentItemFragment
          ...tileCardFragment
        }
      }
    }
  }
  ${contentItemFragment}
  ${tileCardFragment}
`;
