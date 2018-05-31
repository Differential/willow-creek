import { gql } from 'apollo-server';
import { mapValues, values, merge } from 'lodash';

import * as Node from './node';
import * as ContentChannel from './content-channels';

const data = {
  Node,
  ContentChannel,
};

export const schema = gql`
  type Query {
    node(id: ID!): Node
    contentChannels: [ContentChannel]
  }
  ${values(data).map((datum) => datum.schema)}
`;

export const resolvers = merge(...values(data).map((datum) => datum.resolver));

export const models = mapValues(data, (datum) => datum.model);
