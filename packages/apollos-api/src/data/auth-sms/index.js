import { AuthSms, Utils } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import { AuthenticationError } from 'apollo-server';

const { resolver } = AuthSms;

class dataSource extends AuthSms.dataSource {
  createOrFindSmsLoginUserId = async ({
    phoneNumber: inputPhoneNumber,
    userProfile,
  }) => {
    const { phoneNumber, countryCode } = this.parsePhoneNumber({
      phoneNumber: inputPhoneNumber,
    });

    //     const existingPhoneNumbers = await this.request('/PhoneNumbers')
    //       .filter(`Number eq '${phoneNumber}'`)
    //       .get();
    //
    //     // If we have only one phone number, use that phone number
    //     if (existingPhoneNumbers.length === 1) {
    //       return { personId: existingPhoneNumbers[0].personId, newUser: false };
    //     }

    // Otherwise, create a new user.
    const personAttributes = Utils.fieldsAsObject(userProfile || []);
    const personId = await this.context.dataSources.Auth.createUserProfile({
      email: null,
      ...personAttributes,
    });

    await this.createPhoneNumber({ personId, phoneNumber, countryCode });

    return { personId, newUser: true };
  };

  authenticateWithSms = async ({
    pin,
    phoneNumber: phoneNumberInput,
    userProfile,
  }) => {
    const { phoneNumber } = this.parsePhoneNumber({
      phoneNumber: phoneNumberInput,
    });

    let status = 'EXISTING_USER';

    const userLogin = await this.request('/UserLogins')
      .filter(`UserName eq '${phoneNumber}'`)
      .first();

    if (!userLogin) {
      throw new AuthenticationError('Invalid input');
    }

    // remember that Rock null values are often empty objects!
    if (!userLogin.personId || typeof userLogin.personId === 'object') {
      // We created a login for this user, but don't know who they are yet.
      const { personId, newUser } = await this.createOrFindSmsLoginUserId({
        phoneNumber,
        userProfile,
      });

      status = newUser ? 'NEW_USER' : 'NEW_USER_WITH_ROCK_PROFILE';

      // Update the user login to include the PersonId.
      await this.patch(`/UserLogins/${userLogin.id}`, { PersonId: personId });
    }

    const password = this.hashPassword({ pin });

    const result = await this.context.dataSources.Auth.authenticate({
      identity: phoneNumber,
      password,
    });
    return { ...result, status };
  };
}

const schema = gql`
  ${AuthSms.schema}

  enum AUTHENTICATION_STATUS {
    EXISTING_USER
    NEW_USER_WITH_ROCK_PROFILE
    NEW_USER
  }

  extend type Authentication {
    status: AUTHENTICATION_STATUS
  }
`;

export { schema, resolver, dataSource };
