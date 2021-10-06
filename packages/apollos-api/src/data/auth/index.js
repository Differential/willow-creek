import { AuthenticationError } from 'apollo-server';
import { Auth } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import moment from 'moment';

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

  createUserLogin = async (props = {}) => {
    try {
      const { email, password, personId } = props;

      return await this.post('/UserLogins', {
        PersonId: personId,
        EntityTypeId: 27, // A default setting we use in Rock-person-creation-flow
        UserName: email,
        PlainTextPassword: password,
        LastLoginDateTime: `${moment().toISOString()}`,
        // If this value is false, logging in is impossible.
        IsConfirmed: true,
      });
    } catch (err) {
      throw new Error('Unable to create user login!');
    }
  };
}

export { schema, resolver, dataSource, contextMiddleware };
