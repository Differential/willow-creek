import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import gql from 'graphql-tag';
import { client } from '../../client';

export const GET_USER_COOKIE = gql`
  query CurrentUserCookie {
    currentUser {
      id
      rockToken
    }
  }
`;

export const getCookie = async () => {
  const { data: { currentUser: { rockToken } = {} } = {} } = await client.query(
    {
      query: GET_USER_COOKIE,
    }
  );
  return rockToken;
};

const Browser = {
  open: async (url, options) => {
    const cookie = await getCookie();
    if (cookie)
      console.warn(
        "iOS doesn't support headers, you may want to use src/user-web-view"
      );
    const headers = { Cookie: cookie };
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(url, {
          headers,
          ...options,
        });
      } else Linking.openURL(url);
    } catch (e) {
      console.error(e);
    }
  },
};

export default Browser;
