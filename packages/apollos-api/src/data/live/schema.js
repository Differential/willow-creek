import { liveSchema } from '@apollosproject/data-schema';
import { gql } from 'apollo-server';

export default gql`
  extend type LiveStream {
    stream: VideoMedia
  }
  ${liveSchema}
`;
