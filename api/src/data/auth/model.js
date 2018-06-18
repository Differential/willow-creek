import { AuthenticationError } from 'apollo-server';
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
      this.context.connectors.Rock.defaultRequestOptions.headers.cookie = cookie;
    } catch (e) {
      throw new AuthenticationError('Invalid token');
    }
  };

  getCurrentPerson = () => {
    if (this.userToken) {
      return this.request('People/GetCurrentPerson').get();
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
}
