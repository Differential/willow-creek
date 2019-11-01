import gql from 'graphql-tag';

export default gql`
  query getCampusEvents {
    currentUser {
      id
      profile {
        id
        campus {
          id
          events {
            id
            name
            description
            start
            end
            url
            image {
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
