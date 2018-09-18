import { createGlobalId } from '../node';

export default {
  Query: {
    people: (root, { email }, { dataSources }) =>
      dataSources.Person.getFromEmail(email),
  },
  Mutation: {
    updateProfile: (root, { input: { field, value } }, { dataSources }) =>
      dataSources.Person.updateProfile({ field, value }),
    uploadProfileImage: async (root, { file, size }, { dataSources }) =>
      dataSources.Person.uploadProfileImage(file, size),
  },
  Person: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    photo: ({ photo: { url } }) => ({ uri: url }),
    firstName: ({ firstName }) =>
      typeof firstName === 'object' ? '' : firstName,
    lastName: ({ lastName }) => (typeof lastName === 'object' ? '' : lastName),
  },
};
