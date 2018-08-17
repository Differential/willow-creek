import getContext from 'apollos-church-api/src/getContext';
import getDataSources from 'apollos-church-api/src/getDataSources';
import { KeyValueCache } from 'apollo-server-caching';

export function getTestContext(req) {
  const context = getContext(req);

  const dataSources = getDataSources();
  // Apollo Server does this internally.
  Object.values(dataSources).forEach((dataSource) => {
    if (dataSource.initialize) {
      dataSource.initialize({ context, cache: KeyValueCache });
    }
  });
  context.dataSources = dataSources;
  return context;
}

export const buildGetMock = (response, dataSource) => {
  const get = jest.fn();
  if (Array.isArray(response) && Array.isArray(response[0])) {
    response.forEach((responseVal) => {
      get.mockReturnValueOnce(
        new Promise((resolve) => resolve(dataSource.normalize(responseVal)))
      );
    });
  }
  get.mockReturnValue(
    new Promise((resolve) => resolve(dataSource.normalize(response)))
  );
  return get;
};
