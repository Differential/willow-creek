import { gql } from 'apollo-server';
import { mapValues, values, merge } from 'lodash';

import * as Node from './node';
import * as ContentChannel from './content-channels';
import * as ContentItem from './content-items';
import * as Media from './media';

const data = {
  Node,
  ContentChannel,
  ContentItem,
  Media,
};

export const schema = gql`
  ${values(data).map((datum) => datum.schema)}
  type Query {
    node(id: ID!): Node
    userFeed(first: Int, after: String): ContentItemsConnection
    contentChannels: [ContentChannel]
  }
`;

export const resolvers = merge(...values(data).map((datum) => datum.resolver));

export const models = {
  ...mapValues(data, (datum) => datum.model),
  UniversalContentItem: ContentItem.model, // alias
};
