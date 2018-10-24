import { AuthenticationError } from 'apollo-server';
import { fetch, Request } from 'apollo-server-env';
import moment from 'moment';
import RockApolloDataSource from 'apollos-rock-apollo-data-source';

import { generateToken, registerToken } from './token';

export default class AuthDataSource extends RockApolloDataSource {
  resource = 'Auth';

  rockCookie = null;

  userToken = null;

  getCurrentPerson = async ({ cookie } = { cookie: null }) => {
    const { rockCookie } = this.context;
    const userCookie = cookie || rockCookie;
    if (userCookie) {
      const request = await this.request('People/GetCurrentPerson').get({
        options: { headers: { cookie: userCookie } },
      });
      return request;
    }
    throw new AuthenticationError('Must be logged in');
  };

  fetchUserCookie = async (Username, Password) => {
    try {
      // We use `new Response` rather than string/options b/c if conforms more closely with ApolloRESTDataSource
      // (makes mocking in tests WAY easier to use `new Request` as an input in both places)
      const response = await fetch(
        new Request(`${this.baseURL}/Auth/Login`, {
          method: 'POST',
          body: JSON.stringify({
            Username,
            Password,
          }),
          headers: {
            'Content-Type': 'Application/Json',
          },
        })
      );
      if (response.status >= 400) throw new AuthenticationError();
      const cookie = response.headers.get('set-cookie');
      return cookie;
    } catch (err) {
      throw new AuthenticationError('Invalid Credentials');
    }
  };

  createSession = async ({ cookie }) => {
    const currentUser = await this.getCurrentPerson({ cookie });
    return this.post('/InteractionSessions', {
      PersonAliasId: currentUser.primaryAliasId,
    });
  };

  authenticate = async ({ identity, password }) => {
    try {
      const cookie = await this.fetchUserCookie(identity, password);
      const sessionId = await this.createSession({ cookie });
      const token = generateToken({ cookie, sessionId });
      const { userToken, rockCookie } = registerToken(token);
      this.context.rockCookie = rockCookie;
      this.context.userToken = userToken;
      this.context.sessionId = sessionId;
      return { token, rockCookie };
    } catch (e) {
      throw e;
    }
  };

  personExists = async ({ identity }) => {
    const hasUserName = await this.request(
      `/UserLogins?$filter=UserName eq '${identity}'`
    ).get();

    if (hasUserName.length) {
      return true;
    }
    return false;
  };

  createUserProfile = async (props = {}) => {
    try {
      const { email } = props;

      return await this.post('/People', {
        Email: email,
        IsSystem: false, // Required by Rock
        Gender: 0, // Required by Rock
      });
    } catch (err) {
      throw new Error('Unable to create profile!');
    }
  };

  createUserLogin = async (props = {}) => {
    try {
      const { email, password, personId } = props;

      return await this.post('/UserLogins', {
        PersonId: personId,
        EntityTypeId: 27, // A default setting we use in Rock-person-creation-flow
        UserName: email,
        PlainTextPassword: password,
        LastLoginDateTime: `${moment().toISOString()}`,
      });
    } catch (err) {
      throw new Error('Unable to create user login!');
    }
  };

  changePassword = async ({ password }) => {
    const currentUser = await this.getCurrentPerson();
    const { email, id } = currentUser;
    const logins = await this.request('/UserLogins')
      .filter(`UserName eq '${email}'`)
      .get();

    if (logins.length > 0) {
      await this.delete(`/UserLogins/${logins[0].id}`);
    }
    await this.createUserLogin({
      personId: id,
      email,
      password,
    });
    return this.authenticate({
      identity: email,
      password,
    });
  };

  registerPerson = async ({ email, password }) => {
    const personExists = await this.personExists({ identity: email });
    if (personExists) throw new Error('User already exists!');

    const personId = await this.createUserProfile({ email });
    await this.createUserLogin({
      email,
      password,
      personId,
    });

    const token = await this.authenticate({ identity: email, password });
    return token;
  };
}
