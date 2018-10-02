import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'ASea$2gadj#asd0';

export const parseToken = (token) => jwt.verify(token, secret);

export const registerToken = (token) => {
  try {
    const { cookie, sessionId } = parseToken(token);

    return {
      userToken: token,
      rockCookie: cookie,
      sessionId,
    };
  } catch (e) {
    throw new AuthenticationError('Invalid token');
  }
};

export const generateToken = (params) =>
  jwt.sign({ ...params }, secret, { expiresIn: '60d' });
