import { createGlobalId } from '@apollosproject/server-core';
import { dataSource } from '@apollosproject/data-connector-algolia-search';
import { graphql } from 'graphql';
import { get } from 'lodash';

class Search extends dataSource {
  async mapItemToAlgolia(item) {
    const { ContentItem } = this.context.dataSources;
    const type = await ContentItem.resolveType(item);

    const { data } = await graphql(
      this.context.schema,
      `
query getItem {
  node(id: "${createGlobalId(item.id, type)}") {
    ... on ContentItem {
      id
      title
      summary
      objectID: id
      __typename
      coverImage { sources { uri } }
    }
  }
}`,
      {},
      this.context
    );
    const searchTags = get(item, 'attributeValues.searchTags.value');
    const campusGuid = get(item, 'attributeValues.campus.value');
    const { node } = data;
    return { ...node, searchTags, campusGuid };
  }

  async indexAll() {
    const { ContentItem } = this.context.dataSources;
    let itemsLeft = true;
    const args = { after: null, first: 100 };

    while (itemsLeft) {
      const { edges } = await ContentItem.paginate({
        cursor: ContentItem.bySearchableContent(),
        args,
      });

      const result = await edges;
      const items = result.map(({ node }) => node);
      itemsLeft = items.length === 100;

      if (itemsLeft) args.after = result[result.length - 1].cursor;

      const indexableItems = await Promise.all(
        items.map((item) => this.mapItemToAlgolia(item))
      );

      await this.addObjects(indexableItems.filter((item) => !!item));
    }
  }
}

export default Search;
