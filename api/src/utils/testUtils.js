import getContext from '/api/getContext';
import getDataSources from '/api/getDataSources';
import { KeyValueCache } from 'apollo-server-caching';

export function getTestContext() {
  const context = getContext();

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
