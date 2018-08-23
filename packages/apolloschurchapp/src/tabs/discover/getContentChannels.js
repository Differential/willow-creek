import gql from 'graphql-tag';

export default gql`
  query getContentChannels {
    contentChannels {
      id
      name
      childContentItemsConnection(first: 3) {
        edges {
          node {
            id
            title
            coverImage {
              sources {
                uri
              }
            }
          }
        }
      }
    }
  }
`;
