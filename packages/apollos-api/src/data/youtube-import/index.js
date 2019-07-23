import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import gql from 'graphql-tag';
import moment from 'moment';

// mutation importVideo {
//   importYoutubeVideo(
//     youtubeId:"oKu-mLaCqQQ",
//     contentChannelId:"12",
//     contentChannelTypeId:"11"
//   ){
//     id
//   }
// }

class YoutubeImport extends RockApolloDataSource {
  expanded = true;

  importFromYoutube = async ({
    youtubeId,
    contentChannelId,
    contentChannelTypeId,
  }) => {
    const { Youtube } = this.context.dataSources;
    const video = await Youtube.getFromId(youtubeId);
    return this.createContentItemFromVideo(video, {
      contentChannelTypeId,
      contentChannelId,
    });
  };

  createContentItemFromVideo = async (
    { snippet },
    { contentChannelTypeId, contentChannelId }
  ) => {
    const { ContentItem } = this.context.dataSources;
    const alreadyExists = await this.request('/ContentChannelItems')
      .filter(`Title eq '${snippet.title.replace(/'/g, ``)}'`)
      .first();

    if (alreadyExists) {
      return alreadyExists;
    }

    const id = await this.post('/ContentChannelItems', {
      Title: snippet.title.replace(/'/g, ``),
      Content: `${snippet.description}`,
      ContentChannelTypeId: contentChannelTypeId,
      ContentChannelId: contentChannelId,
      StartDateTime: moment(snippet.publishedAt)
        .format()
        .split(/[-+]\d+:\d+/)[0],
    });

    await this.post(
      `/ContentChannelItems/AttributeValue/${id}?attributeKey=YoutubeId&attributeValue=${snippet.resourceId.videoId}`
    );

    return ContentItem.getFromId(id);
  };

  importChannelFromYoutube = async ({
    channelId,
    contentChannelId,
    contentChannelTypeId,
  }) => {
    const { Youtube } = this.context.dataSources;

    const { items } = await Youtube.getPlaylistItems(channelId);

    return Promise.all(
      items.map(async (video) =>
        this.createContentItemFromVideo(video, {
          contentChannelTypeId,
          contentChannelId,
        })
      )
    );
  };
}

const schema = gql`
  extend type Mutation {
    importYoutubeVideo(
      youtubeId: String!
      contentChannelId: String!
      contentChannelTypeId: String!
    ): ContentItem
    importYoutubeChannel(
      channelId: String!
      contentChannelId: String!
      contentChannelTypeId: String!
    ): [ContentItem]
  }
`;

const resolver = {
  Mutation: {
    importYoutubeVideo: (root, args, { dataSources }) =>
      dataSources.YoutubeImport.importFromYoutube(args),
    importYoutubeChannel: (root, args, { dataSources }) =>
      dataSources.YoutubeImport.importChannelFromYoutube(args),
  },
};

export { YoutubeImport as dataSource, schema, resolver };
