import { get } from 'lodash';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import { ensureCacheHydration } from './cache';
import { client } from '.';

export default setContext(async (request, { headers, cache }) => {
  try {
    await ensureCacheHydration;

    const {
      data: { isLoggedIn },
    } = await client.query({
      query: gql`
        query {
          isLoggedIn @client
        }
      `,
    });
    if (!isLoggedIn) return { headers };

    const data = cache.readQuery({
      query: gql`
        query currentCampusId {
          currentUser {
            id
            profile {
              id
              campus {
                id
              }
            }
          }
        }
      `,
    });
    const campusId = get(data, 'currentUser.profile.campus.id');
    if (campusId) {
      return { headers: { ...headers, 'X-Campus': campusId } };
    }
  } catch (e) {
    console.log(e);
  }
  return { headers };
});
