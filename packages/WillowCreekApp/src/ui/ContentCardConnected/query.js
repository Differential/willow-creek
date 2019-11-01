import gql from 'graphql-tag';

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
    isLiked
    ... on MediaContentItem {
      videos {
        sources {
          uri
        }
      }
    }
    ... on WeekendContentItem {
      videos {
        sources {
          uri
        }
      }
      liveStream {
        isLive
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

export const LARGE_CARD_FRAGMENT = gql`
  fragment largeCardFragment on ContentItem {
    ...baseCardFragment
  }
  ${BASE_CARD_FRAGMENT}
`;

const GET_CONTENT_CARD = gql`
  query getContentCard($contentId: ID!) {
    node(id: $contentId) {
      id
      __typename
      ...largeCardFragment
    }
  }
  ${LARGE_CARD_FRAGMENT}
`;

export default GET_CONTENT_CARD;
