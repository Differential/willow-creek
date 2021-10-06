import { AuthSms, Utils } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import { AuthenticationError, UserInputError } from 'apollo-server';
import ApollosConfig from '@apollosproject/config';

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

  requestSmsLogin = async ({ phoneNumber: phoneNumberInput }) => {
    // E.164 Regex that twilio recommends
    // https://www.twilio.com/docs/glossary/what-e164
    const { valid, phoneNumber, e164 } = this.parsePhoneNumber({
      phoneNumber: phoneNumberInput,
    });

    if (!valid) {
      throw new UserInputError(`${phoneNumber} is not a valid phone number`);
    }

    const { pin, password } = this.generateSmsPinAndPassword();

    const existingUserLogin = await this.request('/UserLogins')
      .filter(`UserName eq '${phoneNumber}'`)
      .first();

    let personOptions = {};

    // Updating PlainTextPassword via Patch doesn't work, so we delete and recreate.
    if (existingUserLogin) {
      // if we have a PersonId on the user login, we should move it over to the new login.
      if (existingUserLogin.personId)
        personOptions = { PersonId: existingUserLogin.personId };

      await this.delete(`/UserLogins/${existingUserLogin.id}`);
    }

    await this.post('/UserLogins', {
      EntityTypeId: 27, // A default setting we use in Rock-person-creation-flow
      UserName: phoneNumber,
      PlainTextPassword: password,
      IsConfirmed: true,
      ...personOptions, // { PersonId: ID } OR null
    });

    await this.context.dataSources.Sms.sendSms({
      to: e164,
      body: `${ApollosConfig?.SMS_LOGIN_MESSAGE ||
        'Thanks for logging in!'} Your code is ${pin}`,
    });

    return {
      success: true,
      userAuthStatus: existingUserLogin ? 'EXISTING_APP_USER' : 'NONE',
    };
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
