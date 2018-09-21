import { gql } from 'apollo-server';

export default gql`
  enum UPDATEABLE_PROFILE_FIELDS {
    FirstName
    LastName
  }

  input UpdateProfileInput {
    field: UPDATEABLE_PROFILE_FIELDS!
    value: String!
  }

  type Person implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    nickName: String
    email: String
    photo: ImageMediaSource
  }

  extend type Mutation {
    updateProfileField(input: UpdateProfileInput!): Person
    updateProfileFields(input: [UpdateProfileInput]!): Person
    uploadProfileImage(file: Upload!, size: Int!): Person
  }

  extend type Query {
    people(email: String!): [Person]
  }
`;
