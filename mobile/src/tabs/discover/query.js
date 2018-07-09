import gql from 'graphql-tag';

const GET_DISCOVER_ITEMS = gql`
  {
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

export default GET_DISCOVER_ITEMS;
