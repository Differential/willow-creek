import gql from 'graphql-tag';

export default gql`
  query getFeedFeatures {
    userFeedFeatures {
      ... on ActionListFeature {
        id
        title
        subtitle
        additionalAction {
          # actionMeta
          title
        }
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
            }
          }
        }
      }
    }
  }
`;
