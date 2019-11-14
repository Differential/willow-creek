import { get } from 'lodash';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

export default setContext((request, { headers, cache }) => {
  let campusId = null;
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
    campusId = get(data, 'currentUser.profile.campus.id');
  } catch (e) {
    console.log(e);
  }
  return { headers: { ...headers, 'X-Campus': campusId } };
});
