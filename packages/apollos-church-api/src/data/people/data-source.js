import { AuthenticationError } from 'apollo-server';
import FormData from 'form-data';
import { camelCase } from 'lodash';
import RockApolloDataSource from 'apollos-church-api/src/connectors/rock/data-source';

export default class Person extends RockApolloDataSource {
  resource = 'People';

  getFromId = (id) =>
    this.request()
      .find(id)
      .get();

  getFromEmail = (email) =>
    this.request()
      .filter(`Email eq '${email}'`)
      .get();

  updateProfile = async ({ field, value }) => {
    const currentPerson = await this.context.dataSources.Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    await this.patch(`/People/${currentPerson.id}`, {
      [field]: value,
    });
    return {
      ...currentPerson,
      [camelCase(field)]: value,
    };
  };

  uploadProfileImage = async (file, length) => {
    const { stream, filename } = await file;
    const data = new FormData();
    data.append('file', stream, {
      filename,
      knownLength: length,
    });
    const response = await this.nodeFetch(
      `${this.baseURL}/BinaryFiles/Upload?binaryFileTypeId=5`,
      {
        method: 'POST',
        body: data,
        headers: {
          'Authorization-Token': this.rockToken,
          ...data.getHeaders(),
        },
      }
    );
    const photoId = await response.text();
    return this.updateProfile({ field: 'PhotoId', value: photoId });
  };
}
