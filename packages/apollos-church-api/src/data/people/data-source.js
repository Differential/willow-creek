import { AuthenticationError } from 'apollo-server';
import FormData from 'form-data';
import { camelCase, mapKeys } from 'lodash';
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

  // fields is an array of objects matching the pattern
  // [{ field: String, value: String }]
  updateProfile = async (fields) => {
    const currentPerson = await this.context.dataSources.Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    const fieldsAsObject = fields.reduce(
      (accum, { field, value }) => ({
        ...accum,
        [field]: value,
      }),
      {}
    );

    await this.patch(`/People/${currentPerson.id}`, fieldsAsObject);

    return {
      ...currentPerson,
      ...mapKeys(fieldsAsObject, (_, key) => camelCase(key)),
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
    return this.updateProfile([{ field: 'PhotoId', value: photoId }]);
  };
}
