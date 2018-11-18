// eslint-disable-next-line import/prefer-default-export
export const withEdgePagination = async ({ edges }) => {
  const result = await edges;
  const startCursor = result.length ? result[0].cursor : null;
  const endCursor = result.length ? result[result.length - 1].cursor : null;
  return { startCursor, endCursor };
};
