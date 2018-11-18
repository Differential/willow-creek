import { gql } from 'apollo-server';
import ApollosConfig from '@apollosproject/config';
import withCloudinary from '../../connectors/cloudinary';

const { ROCK } = ApollosConfig;

export const schema = gql`
  interface Media {
    name: String
    key: String
    sources: [MediaSource]
  }

  interface MediaSource {
    uri: String
  }

  type ImageMedia implements Media {
    name: String
    key: String
    sources: [ImageMediaSource]
  }

  type VideoMedia implements Media {
    name: String
    key: String
    sources: [VideoMediaSource]
    # duration: Float
    embedHtml: String
  }

  type AudioMedia implements Media {
    name: String
    key: String
    # duration: Float
    sources: [AudioMediaSource]
  }

  type AudioMediaSource implements MediaSource {
    uri: String
    # format: String
    # size: String
  }

  type ImageMediaSource implements MediaSource {
    uri: String
    # width: Int
    # height: Int
  }

  type VideoMediaSource implements MediaSource {
    uri: String
    # format: String
    # size: String
  }

  enum MediaInputType {
    IMAGE
    VIDEO
    AUDIO
  }
`;

const addTypenameToSources = (__typename) => ({ sources }) =>
  sources.map((s) => ({ __typename, ...s }));

export const resolver = {
  Media: {
    // Implementors must attach __typename to root.
    __resolveType: ({ __typename }) => __typename,
  },
  MediaSource: {
    // Implementors must attach __typename to root.
    __resolveType: ({ __typename }) => __typename,
  },
  ImageMedia: {
    sources: addTypenameToSources('ImageMediaSource'),
  },
  AudioMedia: {
    sources: addTypenameToSources('AudioMediaSource'),
  },
  VideoMedia: {
    sources: addTypenameToSources('VideoMediaSource'),
  },
  ImageMediaSource: {
    uri: ({ uri = '' }) => {
      if (!uri || typeof uri !== 'string') return null;
      if (uri.startsWith('http')) return withCloudinary(uri);
      if (uri.startsWith('//')) return withCloudinary(`https:${uri}`);

      // Handle Rock GUID:
      if (uri.split('-').length === 5)
        return withCloudinary(`${ROCK.IMAGE_URL}?guid=${uri}`);

      return uri;
    },
  },
};
