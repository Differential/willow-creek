import { Auth } from '@apollosproject/data-connector-rock';

const { schema, resolver, contextMiddleware } = Auth;

class dataSource extends Auth.dataSource {
  createUserProfile = async ({ email, ...otherFields }) => {
    try {
      return await this.post('/People', {
        Email: email,
        Gender: 0, // Required by Rock
        ...otherFields,
        IsSystem: false, // Required by Rock
        ConnectionStatusValueId: 5679, // Points to 'App User'
      });
    } catch (err) {
      throw new Error('Unable to create profile!');
    }
  };
}

export { schema, resolver, dataSource, contextMiddleware };
