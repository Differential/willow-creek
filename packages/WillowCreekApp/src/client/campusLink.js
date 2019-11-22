import { get } from 'lodash';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

export default setContext((request, { headers, cache }) => {
  try {
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
