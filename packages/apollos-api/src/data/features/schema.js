// import { Features } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

export default gql`
  extend type ActionListFeature {
    additionalAction: ActionListAction
  }

  extend type ActionListAction {
    actionMeta: String
  }

  enum ACTION_FEATURE_ACTION {
    READ_CONTENT
    READ_EVENT
    VISIT_ROUTE
    OPEN_URL
  }

  ### FROM CORE

  interface Feature {
    id: ID!
    order: Int # 0 is the "Main Content". If order is < 0 than this comes before the body content.
  }

  # enum ACTION_FEATURE_ACTION {
  #   READ_CONTENT
  #   READ_EVENT
  # }

  type ActionListAction {
    id: ID!

    title: String
    subtitle: String
    image: ImageMedia
    relatedNode: Node
    action: ACTION_FEATURE_ACTION
  }

  type ActionListFeature implements Feature & Node {
    id: ID!
    order: Int

    title: String
    subtitle: String
    actions: [ActionListAction]
  }

  type TextFeature implements Feature & Node {
    id: ID!
    order: Int

    body: String
  }

  type ScriptureFeature implements Feature & Node {
    id: ID!
    order: Int

    scriptures: [Scripture]
  }

  extend type WeekendContentItem {
    features: [Feature]
  }

  extend type ContentSeriesContentItem {
    features: [Feature]
  }

  extend type Query {
    userFeedFeatures: [Feature] @cacheControl(maxAge: 0)
  }
`;
