import { dataSources } from './data';

export default () => {
  const sources = {
    LiveStream: new dataSources.LiveStream(),
    ContentChannel: new dataSources.ContentChannel(),
    ContentItem: new dataSources.ContentItem(),
    Person: new dataSources.Person(),
    Auth: new dataSources.Auth(),
    Scripture: new dataSources.ESVScripture(),
  };

  return {
    ...sources,
    UniversalContentItem: sources.ContentItem, // alias
  };
};
