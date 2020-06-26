import { Feature } from '@apollosproject/data-connector-rock';

import gql from 'graphql-tag';

export default gql`
  extend type ActionListFeature {
    additionalAction: ActionListAction
  }

  extend enum ACTION_FEATURE_ACTION {
    VISIT_ROUTE
  }

  type LinkFeature implements Feature & Node {
    id: ID!
    order: Int
    url: String
  }

  ${Feature.schema}
`;
