import { gql } from 'apollo-server';
import { get } from 'lodash';
import flow from 'lodash/fp/flow';
import omitBy from 'lodash/fp/omitBy';
import pickBy from 'lodash/fp/pickBy';
import mapValues from 'lodash/fp/mapValues';
import values from 'lodash/fp/values';
import sanitizeHtml from '../../utils/sanitize-html';
import { Constants } from '../../connectors/rock';
import { createGlobalId } from '../node';

const mapValuesWithKey = mapValues.convert({ cap: false });

export { default as model } from './model';

export const schema = gql`
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
    parentChannel: ContentChannel
    # TODO theme: Theme
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
    parentChannel: ContentChannel
    terms(match: String): [Term]
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
    attributeValues[key].value.startsWith('http')); // looks like an image url

const isVideo = ({ key, attributeValues, attributes }) =>
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.VIDEO_FILE ||
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.VIDEO_URL ||
  (key.toLowerCase().includes('video') &&
    attributeValues[key].value.startsWith('http')); // looks like a video url

const isAudio = ({ key, attributeValues, attributes }) =>
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.AUDIO_FILE ||
  attributes[key].fieldTypeId === Constants.FIELD_TYPES.AUDIO_URL ||
  (key.toLowerCase().includes('audio') &&
    attributeValues[key].value.startsWith('http')); // looks like an audio url

export const defaultContentItemResolvers = {
  id: ({ id }, args, context, { parentType }) =>
    createGlobalId(id, parentType.name),
  htmlContent: ({ content }) => sanitizeHtml(content),
  childContentItemsConnection: async ({ id }, args, { models }) =>
    models.ContentItem.paginate({
      cursor: await models.ContentItem.getCursorByParentContentItemId(id),
      args,
    }),

  parentChannel: ({ contentChannelId }, args, { models }) =>
    models.ContentChannel.getFromId(contentChannelId),

  images: ({ attributeValues, attributes }) => {
    const imageKeys = Object.keys(attributes).filter((key) =>
      isImage({
        key,
        attributeValues,
        attributes,
      })
    );
    return imageKeys.map((key) => ({
      key,
      name: attributes[key].name,
      sources: [{ uri: attributeValues[key].value }],
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
      key,
      name: attributes[key].name,
      embedHtml: get(attributeValues, 'videoEmbed.value', null), // TODO: this assumes that the key `VideoEmebed` is always used on Rock
      sources: [{ uri: attributeValues[key].value }],
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
      key,
      name: attributes[key].name,
      sources: [{ uri: attributeValues[key].value }],
    }));
  },

  coverImage: async (root, args, { models }) => {
    const defaultImages = defaultContentItemResolvers.images(root);
    // return top image by defalt. TODO: probably better logic to default to.
    if (defaultImages.length) return defaultImages[0];

    // If no image, check parent for image:
    const parentItems = await (await models.ContentItem.getCursorByChildContentItemId(
      root.id
    )).get();

    if (parentItems.length) {
      const parentImages = parentItems
        .map(defaultContentItemResolvers.images)
        .find((images) => images.length);

      if (parentImages && parentImages.length) return parentImages[0];
    }

    return null;
  },
};

export const resolver = {
  Query: {
    userFeed: (root, args, { models }) =>
      models.ContentItem.paginate({
        cursor: models.ContentItem.byUserFeed(),
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
};
