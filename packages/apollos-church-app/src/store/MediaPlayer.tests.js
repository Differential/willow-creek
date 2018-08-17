import { client } from 'apollos-church-app/src/client';
import gql from 'graphql-tag';

import { resolvers, defaults } from '.';

const query = gql`
  query {
    mediaPlayer @client {
      nowPlayingIndex
      queue
      isPlaying
    }
  }
`;

describe('MediaPlayer Store', () => {
  beforeEach(() => {
    client.writeData({ data: defaults });
  });

  it('enqueues a track', async () => {
    resolvers.Mutation.mediaPlayerEnqueue(
      {},
      { name: 'some cool track!' },
      { cache: client.cache }
    );
    expect(client.query({ query })).resolves.toMatchSnapshot();
  });
  it('updates player state', async () => {
    resolvers.Mutation.mediaPlayerEnqueue(
      {},
      { name: 'some cool track!' },
      { cache: client.cache }
    );
    expect(client.query({ query })).resolves.toMatchSnapshot();
    resolvers.Mutation.mediaPlayerUpdatePlayer(
      {},
      { isPlaying: true },
      { cache: client.cache }
    );
    expect(client.query({ query })).resolves.toMatchSnapshot();
    resolvers.Mutation.mediaPlayerUpdatePlayer(
      {},
      { isPlaying: false },
      { cache: client.cache }
    );
  });
  it('switches between tracks', async () => {
    resolvers.Mutation.mediaPlayerEnqueue(
      {},
      { name: 'some cool track!' },
      { cache: client.cache }
    );
    resolvers.Mutation.mediaPlayerEnqueue(
      {},
      { name: 'another cool track!' },
      { cache: client.cache }
    );
    expect(client.query({ query })).resolves.toMatchSnapshot();
    resolvers.Mutation.mediaPlayerNext({}, {}, { cache: client.cache });
    expect(client.query({ query })).resolves.toMatchSnapshot();
    resolvers.Mutation.mediaPlayerNext({}, {}, { cache: client.cache });
    expect(client.query({ query })).resolves.toMatchSnapshot();
    resolvers.Mutation.mediaPlayerNext(
      {},
      { skip: -1 },
      { cache: client.cache }
    );
    expect(client.query({ query })).resolves.toMatchSnapshot();
  });
});
