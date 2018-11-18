export const schema = `
interface Sharable {
  url: String
  message: String
  title: String
}
`;

export const resolver = {
  Sharable: {
    // Implementors must attach __typename to root.
    __resolveType: ({ __typename }) => __typename,
  },
};
