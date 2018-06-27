import gql from 'graphql-tag';

const GET_DISCOVER_ITEMS = gql`
  {
    contentChannels {
      id
      name
    }
  }
`;

export default GET_DISCOVER_ITEMS;
