import { AuthenticationError } from 'apollo-server';
import { Auth } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

const { contextMiddleware } = Auth;

const schema = gql`
  ${Auth.schema}
  extend type Mutation {
    triggerError: Boolean
  }
`;

const resolver = {
  ...Auth.resolver,
  Mutation: {
    ...Auth.resolver.Mutation,
    triggerError: () => {
      throw new AuthenticationError('Triggered error');
    },
  },
};

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
