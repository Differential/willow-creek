import { compact, mapValues, merge, values } from 'lodash';
import gql from 'graphql-tag';
import * as Node from './node';

export { createGlobalId, parseGlobalId } from './node';

// Types that all apollos-church servers will use.
const builtInData = { Node };

export const createSchema = (data) => [
  gql`
    type Query {
      _placeholder: Boolean # needed, empty schema defs aren't supported
    }

    type Mutation {
      _placeholder: Boolean # needed, empty schema defs aren't supported
    }
  `,
  ...compact(values({ ...builtInData, ...data }).map((datum) => datum.schema)),
];

export const createResolvers = (data) =>
  merge(
    ...compact(
      values({ ...builtInData, ...data }).map((datum) => datum.resolver)
    )
  );

const getDataSources = (data) =>
  mapValues({ ...builtInData, ...data }, (datum) => datum.dataSource);

const getModels = (data) =>
  mapValues({ ...builtInData, ...data }, (datum) => datum.model);

const getContextMiddlewares = (data) =>
  compact(
    values({ ...builtInData, ...data }).map((datum) => datum.contextMiddleware)
  );

export const createDataSources = (data) => {
  const dataSources = getDataSources(data);
  return () => {
    const sources = {};
    Object.keys(dataSources).forEach((dataSourceName) => {
      if (dataSources[dataSourceName]) {
        sources[dataSourceName] = new dataSources[dataSourceName]();
      }
    });
    return sources;
  };
};

export const createContext = (data) => ({ req = {} } = {}) => {
  const initiatedModels = {};

  // For all non-datasource connectors. Right now only `Node`.
  const models = getModels(data);
  let context = {
    models: initiatedModels,
  };

  Object.keys(models).forEach((modelName) => {
    if (models[modelName]) {
      initiatedModels[modelName] = new models[modelName](context);
    }
  });

  const contextMiddleware = getContextMiddlewares(data);
  contextMiddleware.forEach((middleware) => {
    context = middleware({ req, context });
  });
  return context;
};

export const createApolloServerConfig = (data) => {
  const context = createContext(data);
  const dataSources = createDataSources(data);
  const schema = createSchema(data);
  const resolvers = createResolvers(data);
  return { context, dataSources, schema, resolvers };
};
