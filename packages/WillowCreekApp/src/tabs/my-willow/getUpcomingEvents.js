import gql from 'graphql-tag';

import { contentItemFragment } from 'WillowCreekApp/src/content-single/getContentItem';
import { tileCardFragment } from 'WillowCreekApp/src/ui/ContentCardConnected';

export default gql`
  query getUpcomingEvents {
    upcomingEvents {
      id
      ...contentItemFragment
      ...tileCardFragment
      sharing {
        url
      }
    }
  }
  ${contentItemFragment}
  ${tileCardFragment}
`;
