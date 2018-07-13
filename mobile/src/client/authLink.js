import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

import { ensureCacheHydration } from './cache';

import { client } from './'; // eslint-disable-line

export default setContext(async (request, { headers }) => {
  try {
    await ensureCacheHydration;

    const {
      data: { authToken },
    } = await client.query({
      query: gql`
        query {
          authToken @client
        }
      `,
    });
    if (!authToken) return {};

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: authToken,
      },
    };
  } catch (err) {
    // eslint-disable-next-line
    console.error('Authorization Failed', err);
    return {};
  }
});
