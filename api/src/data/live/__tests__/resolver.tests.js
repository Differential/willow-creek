// TODO
// import { graphql } from 'graphql';
// import fetch from 'isomorphic-fetch';
// import { makeExecutableSchema } from 'apollo-server';

// import getContext from '../../../getContext';
// // we import the root-level schema and resolver so we test the entire integration:
// import { schema as typeDefs, resolvers } from '../../';

describe('LiveStream', () => {
  // let schema;
  // let context;
  // beforeEach(() => {
  //   fetch.resetMocks();
  //   fetch.mockRockAPI();
  //   schema = makeExecutableSchema({ typeDefs, resolvers });
  //   context = getContext();
  // });

  it('returns', async () => {
    // const query = `
    //   query {
    //     liveStream {
    //       isLive
    //     }
    //   }
    // `;
    // const rootValue = {};

    // const result = await graphql(schema, query, rootValue, context);
    // expect(result).toMatchSnapshot();
    expect(true).toBeTruthy();
  });
});
