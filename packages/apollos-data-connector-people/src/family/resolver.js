const resolver = {
  Person: {
    location: async (root, args, context) => {
      const location = await context.dataSources.Family.getFamilyLocation({
        userId: root.id,
      });

      return location || 'No Location Set';
    },
  },
};

export default resolver;
