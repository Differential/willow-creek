import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import gql from 'graphql-tag';

const { schema, dataSource } = ContentItem;
const { ROCK_MAPPINGS } = ApollosConfig;

const resolver = {
  ...ContentItem.resolver,
  Query: {
    growCampaign: async (root, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.getCursorByParentContentItemId([
          ROCK_MAPPINGS.GROW_FEATURE_ITEM_ID,
        ]),
        args,
      }),
    myWillowCampaign: async (root, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.getCursorByParentContentItemId([
          ROCK_MAPPINGS.MY_WILLOW_FEATURE_ITEM_ID,
        ]),
        args,
      }),
  },
  ContentItem: {
    ...ContentItem.resolver.ContentItem,
    __resolveType: async (attrs, ...otherProps) => {
      if (Object.hasOwnProperty.call(attrs, 'eventOccurrenceId'))
        return 'WillowCalendarEventContentItem';
      if (
        Object.hasOwnProperty.call(attrs, 'kind') &&
        attrs.kind.includes('youtube')
      )
        return 'WillowTVContentItem';
      return ContentItem.resolver.ContentItem.__resolveType(
        attrs,
        ...otherProps
      );
    },
  },
};

const overrideSchema = gql`
  ${schema}
  extend type Query {
    growCampaign: ContentItemsConnection
    myWillowCampaign: ContentItemsConnection
  }
`;

export { dataSource, resolver, overrideSchema as schema };
