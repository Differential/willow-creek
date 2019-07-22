import { fetch } from 'apollo-env';
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
    const { Youtube, ContentItem, BinaryFiles } = this.context.dataSources;
    const { snippet } = await Youtube.getFromId(youtubeId);

    const alreadyExists = await this.request('/ContentChannelItems')
      .filter(`Title eq '${snippet.title}'`)
      .first();

    if (alreadyExists) {
      return alreadyExists;
    }

    const id = await this.post('/ContentChannelItems', {
      Title: snippet.title,
      Content: `${snippet.description} ${snippet.thumbnails.high.url}`,
      ContentChannelTypeId: contentChannelTypeId,
      ContentChannelId: contentChannelId,
      StartDateTime: moment(snippet.publishedAt)
        .format()
        .split(/[-+]\d+:\d+/)[0],
    });

    // const image = fetch()

    return ContentItem.getFromId(id);
  };
}

const schema = gql`
  extend type Mutation {
    importYoutubeVideo(
      youtubeId: String!
      contentChannelId: String!
      contentChannelTypeId: String!
    ): ContentItem
  }
`;

const resolver = {
  Mutation: {
    importYoutubeVideo: (root, args, { dataSources }) =>
      dataSources.YoutubeImport.importFromYoutube(args),
  },
};

export { YoutubeImport as dataSource, schema, resolver };
