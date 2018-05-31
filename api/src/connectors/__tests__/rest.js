import fetch from 'isomorphic-fetch';
import RestConnector from '../rest';

const data = 'it worked!';
const baseUrl = 'https://google.com';
const etag = 'etag';

describe('RestConnector', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('constructs', () => {
    expect(new RestConnector()).toBeTruthy();
  });

  describe('normalize function', () => {
    const testJson = {
      'some-key': 'Yo yo',
      AnotherKey: 'yo-yo',
      'Recursive-yo': [
        {
          yes: false,
        },
        {
          NoWay: true,
        },
        [
          {
            'throw for a loop': 'huh?',
          },
        ],
      ],
    };

    it('parses json objects to be consistent with our naming standards', () => {
      const connector = new RestConnector({
        baseUrl,
      });
      const tree = connector.normalize(testJson);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('fetchWithCacheForDataLoader function', () => {
    it('fetches a single url', () => {
      const connector = new RestConnector({
        baseUrl,
      });

      fetch.mockResponseOnce(
        JSON.stringify({
          data,
        })
      );

      connector.fetchWithCacheForDataLoader('/endpoint').then((result) => {
        expect(result).toHaveLength(1);
      });
    });

    it('fetches a list of urls', () => {
      const connector = new RestConnector({
        baseUrl,
      });

      fetch.mockResponse(
        JSON.stringify({
          data,
        })
      );

      connector.fetchWithCacheForDataLoader(['/one', '/two']).then((result) => {
        expect(result).toHaveLength(2);
      });
    });

    it('returns with no url', () => {
      const connector = new RestConnector({
        baseUrl,
      });
      connector.fetchWithCacheForDataLoader().then((result) => {
        expect(result).toHaveLength(0);
      });
    });
  });

  it('loads a single endpoint', () => {
    const connector = new RestConnector({
      baseUrl,
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        data,
      })
    );

    connector.get('/endpoint').then((result) => {
      expect(result).toEqual({
        data,
      });
    });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${baseUrl}/endpoint`);
  });

  it('fetches each endpoint only once', async () => {
    const connector = new RestConnector({
      baseUrl,
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        data,
      })
    );

    const result = await connector.get('/endpoint');
    expect(result).toEqual({
      data,
    });

    const secondResult = await connector.get('/endpoint');
    expect(secondResult).toEqual({
      data,
    });

    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('interprets etags', async () => {
    const connector = new RestConnector({
      baseUrl,
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        data,
      }),
      {
        headers: {
          etag,
        },
      }
    );

    const result = await connector.get('/endpoint');
    expect(result).toEqual({
      data,
    });

    const secondConnector = new RestConnector({
      baseUrl,
    });

    fetch.mockResponseOnce('', {
      status: 304,
    });

    const secondResult = await secondConnector.get('/endpoint');
    expect(secondResult).toEqual({
      data,
    });
  });

  it('handles 204 responses', async () => {
    const connector = new RestConnector({
      baseUrl,
    });

    fetch.mockResponseOnce('', {
      status: 204,
    });

    const result = await connector.get('/endpoint');
    expect(result).toEqual(null);
  });

  it('handles 400 errors', async () => {
    const connector = new RestConnector({
      baseUrl,
    });

    fetch.mockResponseOnce('', {
      status: 400,
    });

    expect(connector.get('/endpoint')).rejects.toBeDefined();
  });

  it('throws errors', () => {
    const connector = new RestConnector({
      baseUrl,
    });
    const error = new Error('error message');
    fetch.mockReject(error);
    expect(connector.get('/endpoint')).rejects.toEqual(error);
  });
});
