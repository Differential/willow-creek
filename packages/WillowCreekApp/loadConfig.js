import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import gql from 'graphql-tag';

ApollosConfig.loadJs({
  FRAGMENTS: {
    ...FRAGMENTS,
    ACTION_LIST_FEATURE_FRAGMENT: gql`
      fragment ActionListFeatureFragment on ActionListFeature {
        id
        title
        subtitle
        actions {
          id
          title
          subtitle
          action
          image {
            sources {
              uri
            }
          }
          relatedNode {
            id
            ... on LinkFeature {
              url
            }
            ... on Event {
              url
              start
            }
          }
        }
      }
    `,
    CAMPUS_PARTS_FRAGMENT: gql`
      fragment CampusParts on Campus {
        id
        name
        latitude
        longitude
        street1
        street2
        city
        state
        postalCode
        image {
          uri
        }
        resources {
          url
          title
          icon
          style
        }
      }
    `,
    CONTENT_MEDIA_FRAGMENT: gql`
      fragment contentMediaFragment on ContentItem {
        id
        title
        parentChannel {
          id
          name
        }
        coverImage {
          sources {
            uri
          }
        }
        videos {
          sources {
            uri
          }
          youtubeId
        }
        audios {
          sources {
            uri
          }
        }
      }
    `,
    CONTENT_ITEM_FRAGMENT: gql`
      fragment contentItemFragment on ContentItem {
        id
        title
        summary
        htmlContent
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
    `,
    CONTENT_CARD_FRAGMENT: gql`
      fragment contentCardFragment on ContentItem {
        id
        __typename
        theme {
          type
          colors {
            primary
            secondary
            screen
            paper
          }
        }

        coverImage {
          sources {
            uri
          }
        }
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
    `,
  },
});
