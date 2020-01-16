import gql from 'graphql-tag';
<<<<<<< ours
import { CONTENT_ITEM_FRAGMENT } from 'WillowCreekApp/src/content-single/getContentItem';

export const COVER_IMAGE_FRAGMENT = gql`
  fragment coverImageFragment on ContentItem {
    coverImage {
      sources {
        uri
      }
    }
  }
`;

export const THEME_FRAGMENT = gql`
  fragment themeFragment on ContentItem {
    theme {
      type
      colors {
        primary
        secondary
        screen
        paper
      }
    }
  }
`;

export const BASE_CARD_FRAGMENT = gql`
  fragment baseCardFragment on ContentItem {
    id
    __typename
    ...coverImageFragment
    ...themeFragment
    title
    hyphenatedTitle: title(hyphenated: true)
    summary
    ... on MediaContentItem {
      videos {
        sources {
          uri
        }
      }
      parentChannel {
        id
        name
      }
    }
    ... on WeekendContentItem {
      videos {
        sources {
          uri
        }
        youtubeId
      }
      parentChannel {
        id
        name
      }
    }
    ... on WillowTVContentItem {
      liveStream {
        isLive
      }
      videos {
        youtubeId
      }
    }
    ... on DevotionalContentItem {
      parentChannel {
        id
        name
      }
    }
  }
  ${COVER_IMAGE_FRAGMENT}
  ${THEME_FRAGMENT}
`;
=======
import ApollosConfig from '@apollosproject/config';
>>>>>>> theirs

const GET_CONTENT_CARD = gql`
  query getContentCard($contentId: ID!) {
    node(id: $contentId) {
      id
      __typename
<<<<<<< ours
      ...baseCardFragment
      ...contentItemFragment
    }
  }
  ${BASE_CARD_FRAGMENT}
  ${CONTENT_ITEM_FRAGMENT}
=======
      ...contentCardFragment
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_CARD_FRAGMENT}
>>>>>>> theirs
`;

export default GET_CONTENT_CARD;
