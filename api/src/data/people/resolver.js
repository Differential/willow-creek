import { createGlobalId } from '../node';

export default {
  Query: {
    people: (root, { email }, { dataSources }) =>
      dataSources.Person.getFromEmail(email),
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
