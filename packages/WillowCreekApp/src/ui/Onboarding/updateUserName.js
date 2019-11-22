import gql from 'graphql-tag';

export default gql`
  mutation updateName($firstName: String!, $lastName: String!, $email: String) {
    updateProfileFields(
      input: [
        { field: FirstName, value: $firstName }
        { field: LastName, value: $lastName }
        { field: Email, value: $email }
      ]
    ) {
      firstName
      lastName
      id
    }
  }
`;
