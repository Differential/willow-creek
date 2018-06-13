export default {
  Query: {
    node: (root, { id }, { models }) => models.Node.get(id),
  },
  Node: {
    __resolveType: ({ __type }, args, { schema }) => schema.getType(__type),
  },
};
