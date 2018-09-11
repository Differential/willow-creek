import { dataSources } from './data';

export default () => {
  const sources = {};
  Object.keys(dataSources).forEach((dataSourceName) => {
    if (dataSources[dataSourceName]) {
      sources[dataSourceName] = new dataSources[dataSourceName]();
    }
  });

  return {
    ...sources,
    UniversalContentItem: sources.ContentItem, // alias
    DevotionalContentItem: sources.ContentItem, // alias
  };
};
