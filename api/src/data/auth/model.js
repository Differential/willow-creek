import { AuthenticationError } from 'apollo-server';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import { RockModel } from '../../connectors/rock';

const secret = process.env.SECRET || 'ASea$2gadj#asd0';

export default class AuthModel extends RockModel {
  resource = 'Auth';

  generateToken = (params) =>
    jwt.sign({ ...params }, secret, { expiresIn: '60d' });

  parseToken = (token) => jwt.verify(token, secret);

  registerToken = (token) => {
    try {
      const { cookie } = this.parseToken(token);
      this.userToken = token;
      this.rockCookie = cookie;
    } catch (e) {
      throw new AuthenticationError('Invalid token');
    }
  };

  getCurrentPerson = async () => {
    if (this.rockCookie) {
      this.context.connectors.Rock.defaultRequestOptions.headers.cookie = this.rockCookie;
      const request = this.request('People/GetCurrentPerson').get();
      await request;
      delete this.context.connectors.Rock.defaultRequestOptions.headers.cookie;
      return request;
    }
    throw new AuthenticationError('Must be logged in');
  };

  fetchUserCookie = async (Username, Password) => {
    try {
      const response = await this.context.connectors.Rock.fetch('Auth/Login', {
        method: 'POST',
        body: JSON.stringify({
          Username,
          Password,
        }),
      });
      if (response.status >= 400) throw new AuthenticationError();
      const cookie = response.headers.get('set-cookie');
      return cookie;
    } catch (err) {
      throw AuthenticationError('Invalid Credentials');
    }
  };

  authenticate = async ({ identity, password }) => {
    try {
      const cookie = await this.fetchUserCookie(identity, password);
      const token = this.generateToken({ cookie });
      this.registerToken(token);
      return { token };
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

      return await this.context.connectors.Rock.post('/People', {
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

      return await this.context.connectors.Rock.post('/UserLogins', {
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
