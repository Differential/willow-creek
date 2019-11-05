import gql from 'graphql-tag';

export const CONTENT_ITEM_FRAGMENT = gql`
  fragment contentItemFragment on ContentItem {
    id
    title
    summary
    coverImage {
      name
      sources {
        uri
      }
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
    parentChannel {
      id
      name
    }
    videos {
      sources {
        uri
      }
    }
    audios {
      sources {
        uri
      }
    }
  }
`;

export const DETAILED_ITEM_FRAGMENT = gql`
  fragment detailedItemFragment on ContentItem {
    isLiked
    ... on WeekendContentItem {
      liveStream {
        isLive
      }
    }
  }
`;

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on ContentItem {
        ...contentItemFragment
        ...detailedItemFragment
      }
    }
  }
  ${CONTENT_ITEM_FRAGMENT}
  ${DETAILED_ITEM_FRAGMENT}
`;
