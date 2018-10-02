import { gql } from 'apollo-server';

export const schema = gql`
  extend type Person {
    location: String
  }
`;

export const resolver = {
  Person: {
    location: async (root, args, context) => {
      const location = await context.dataSources.Family.getFamilyLocation({
        userId: root.id,
      });

      return location || 'No Location Set';
    },
  },
};
