import { gql } from 'apollo-server';
import { get } from 'lodash';
import flow from 'lodash/fp/flow';
import omitBy from 'lodash/fp/omitBy';
import pickBy from 'lodash/fp/pickBy';
import mapValues from 'lodash/fp/mapValues';
import values from 'lodash/fp/values';
import sanitizeHtml from 'apollos-church-api/src/utils/sanitize-html';
import { Constants } from 'apollos-church-api/src/connectors/rock';
import { createGlobalId } from '../node';

const mapValuesWithKey = mapValues.convert({ cap: false });

// export { default as model } from './model';
export { default as dataSource } from './data-source';

export const schema = gql`
  type SharableContentItem implements Sharable {
    url: String
    message: String
    title: String
  }

  interface ContentItem {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
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
    isLiked: Boolean
  }

  type UniversalContentItem implements ContentItem & Node {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    siblingContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    parentChannel: ContentChannel
    terms(match: String): [Term]

    sharing: SharableContentItem
    theme: Theme
    isLiked: Boolean
  }

  type Term {
    key: String
    value: String
  }

  input ContentItemsConnectionInput {
    first: Int
    after: String
  }

  type ContentItemsConnection {
    edges: [ContentItemsConnectionEdge]
    # TODO totalCount: Int
    # TODO pageInfo: PaginationInfo
  }

  type ContentItemsConnectionEdge {
    node: ContentItem
    cursor: String
  }
`;

const isImage = ({ key, attributeValues, attributes }) =>
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.IMAGE ||
  (key.toLowerCase().includes('image') &&
    typeof attributeValues[key].value === 'string' &&
    attributeValues[key].value.startsWith('http')); // looks like an image url

const isVideo = ({ key, attributeValues, attributes }) =>
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.VIDEO_FILE ||
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.VIDEO_URL ||
  (key.toLowerCase().includes('video') &&
    typeof attributeValues[key].value === 'string' &&
    attributeValues[key].value.startsWith('http')); // looks like a video url

const isAudio = ({ key, attributeValues, attributes }) =>
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.AUDIO_FILE ||
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.AUDIO_URL ||
  (key.toLowerCase().includes('audio') &&
    typeof attributeValues[key].value === 'string' &&
    attributeValues[key].value.startsWith('http')); // looks like an audio url

export const defaultContentItemResolvers = {
  id: ({ id }, args, context, { parentType }) =>
    createGlobalId(id, parentType.name),
  htmlContent: ({ content }) => sanitizeHtml(content),
  childContentItemsConnection: async ({ id }, args, { dataSources }) =>
    dataSources.ContentItem.paginate({
      cursor: await dataSources.ContentItem.getCursorByParentContentItemId(id),
      args,
    }),

  parentChannel: ({ contentChannelId }, args, { dataSources }) =>
    dataSources.ContentChannel.getFromId(contentChannelId),

  siblingContentItemsConnection: async ({ id }, args, { dataSources }) =>
    dataSources.ContentItem.paginate({
      cursor: await dataSources.ContentItem.getCursorBySiblingContentItemId(id),
      args,
    }),

  images: ({ attributeValues, attributes }) => {
    const imageKeys = Object.keys(attributes).filter((key) =>
      isImage({
        key,
        attributeValues,
        attributes,
      })
    );
    return imageKeys.map((key) => ({
      __typename: 'ImageMedia',
      key,
      name: attributes[key].name,
      sources: attributeValues[key].value
        ? [{ uri: attributeValues[key].value }]
        : [],
    }));
  },

  videos: ({ attributeValues, attributes }) => {
    const videoKeys = Object.keys(attributes).filter((key) =>
      isVideo({
        key,
        attributeValues,
        attributes,
      })
    );
    return videoKeys.map((key) => ({
      __typename: 'VideoMedia',
      key,
      name: attributes[key].name,
      embedHtml: get(attributeValues, 'videoEmbed.value', null), // TODO: this assumes that the key `VideoEmebed` is always used on Rock
      sources: attributeValues[key].value
        ? [{ uri: attributeValues[key].value }]
        : [],
    }));
  },

  audios: ({ attributeValues, attributes }) => {
    const audioKeys = Object.keys(attributes).filter((key) =>
      isAudio({
        key,
        attributeValues,
        attributes,
      })
    );
    return audioKeys.map((key) => ({
      __typename: 'AudioMedia',
      key,
      name: attributes[key].name,
      sources: attributeValues[key].value
        ? [{ uri: attributeValues[key].value }]
        : [],
    }));
  },

  coverImage: async (root, args, { dataSources }) => {
    const pickBestImage = (images) => {
      // TODO: there's probably a _much_ more explicit and better way to handle this
      const squareImage = images.find((image) =>
        image.key.toLowerCase().includes('square')
      );
      if (squareImage) return { ...squareImage, __typename: 'ImageMedia' };
      return { ...images[0], __typename: 'ImageMedia' };
    };

    let defaultImages = defaultContentItemResolvers.images(root) || [];
    defaultImages = defaultImages.filter((image) => image.sources.length); // filter images w/o URLs
    if (defaultImages.length) return pickBestImage(defaultImages);

    // If no image, check parent for image:
    const parentItemsCursor = await dataSources.ContentItem.getCursorByChildContentItemId(
      root.id
    );
    if (!parentItemsCursor) return null;

    const parentItems = await parentItemsCursor.get();

    if (parentItems.length) {
      const parentImages = parentItems
        .map(defaultContentItemResolvers.images)
        .find((images) => images.length)
        .filter((image) => image.sources.length); // filter images w/o URLs

      if (parentImages && parentImages.length)
        return pickBestImage(parentImages);
    }

    return null;
  },

  // This resolver function is temporary, and is just used to get a seed to generate a random theme from
  theme: (root) => {
    if (![6, 5, 4].includes(root.contentChannelId)) return null; // todo: don't generate a theme for these content channel ids
    return root.guid; // todo: this `guid` is just being used as a seed to generate colors for now
  },
  isLiked: async ({ id }, args, { dataSources }) => {
    const interactions = await dataSources.Interactions.getForContentItem({
      contentItemId: id,
    });
    const likes = interactions.filter((i) => i.operation === 'Like').length;
    const unlike = interactions.filter((i) => i.operation === 'Unlike').length;
    // If likes / unlikes equal we have either unliked the content or haven't liked it yet (both are 0)
    return likes > unlike;
  },
  sharing: (root) => ({ __type: 'SharableContentItem', ...root }),
};

export const resolver = {
  Query: {
    userFeed: (root, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: dataSources.ContentItem.byUserFeed(),
        args,
      }),
  },
  UniversalContentItem: {
    ...defaultContentItemResolvers,
    terms: ({ attributeValues, attributes }, { match }) =>
      flow([
        omitBy((value, key) => isImage({ key, attributes, attributeValues })),
        omitBy((value, key) => isVideo({ key, attributes, attributeValues })),
        omitBy((value, key) => isAudio({ key, attributes, attributeValues })),
        omitBy((value, key) => key === 'videoEmbed'),
        pickBy((value, key) => (match ? key.match(match) : true)),
        mapValuesWithKey(({ value }, key) => ({
          key,
          value,
        })),
        values,
      ])(attributeValues),
  },
  ContentItem: {
    ...defaultContentItemResolvers,
    __resolveType: () => 'UniversalContentItem', // todo: for now, everything is of the same type
  },
  SharableContentItem: {
    url: () => 'https://apollosrock.newspring.cc/', // todo: return a dynamic url that links to the content item
    title: ({ title }) => title,
    message: () => '',
  },
};
