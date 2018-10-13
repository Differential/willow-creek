import gql from 'graphql-tag';

export default gql`
  mutation updateDetails(
    $firstName: String!
    $lastName: String!
    $email: String!
    $nickName: String!
  ) {
    updateProfileFields(
      input: [
        { field: FirstName, value: $firstName }
        { field: LastName, value: $lastName }
        { field: Email, value: $email }
        { field: NickName, value: $nickName }
      ]
    ) {
      firstName
      lastName
      nickName
      email
      id
    }
  }
`;
