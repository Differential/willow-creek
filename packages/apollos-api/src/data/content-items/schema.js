import { ContentItem } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

const { schema } = ContentItem;

export default gql`
  ${schema}

  type WillowTVContentItem implements Node & ContentItem {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
    summary: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    siblingContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    parentChannel: ContentChannel
    sharing: SharableContentItem
    theme: Theme
    likedCount: Int
    isLiked: Boolean
  }

  extend type VideoMedia {
    youtubeId: String
  }

  extend type Query {
    growCampaign: ContentItemsConnection @cacheControl(maxAge: 0)
    myWillowCampaign: ContentItemsConnection @cacheControl(maxAge: 0)
    tvFeed: ContentItemsConnection @cacheControl(maxAge: 0)
  }
`;
