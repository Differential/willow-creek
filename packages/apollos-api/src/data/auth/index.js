import { Auth } from '@apollosproject/data-connector-rock';

const { schema, resolver, contextMiddleware } = Auth;

class dataSource extends Auth.dataSource {
  createUserProfile = async (props = {}) => {
    console.warn('creating user profile');
    try {
      const { email } = props;

      return await this.post('/People', {
        Email: email,
        IsSystem: false, // Required by Rock
        Gender: 0, // Required by Rock
        ConnectionStatusValueId: 5679, //
      });
    } catch (err) {
      throw new Error('Unable to create profile!');
    }
  };
}

export { schema, resolver, dataSource, contextMiddleware };
