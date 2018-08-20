export default {
  Query: {
    node: (root, { id }, { models, dataSources }) =>
      models.Node.get(id, dataSources),
  },
  Node: {
    __resolveType: ({ __type }, args, { schema }) => schema.getType(__type),
  },
};
