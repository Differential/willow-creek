import { ContentItem } from '@apollosproject/data-connector-rock';

export const { schema, dataSource } = ContentItem;

export const resolver = {
  ...ContentItem.resolver,
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
