import fetch from 'isomorphic-fetch';
import RockConnector from '../';

describe('RockConnector', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('constructs', () => {
    expect(new RockConnector()).toBeTruthy();
  });
  it('makes single request with rock tokens', () => {
    fetch.mockResponse(JSON.stringify({ secret_data: '12345' }));
    const r = new RockConnector({ authToken: 'test-token' });
    r.request('SomeResource').get();
    expect(fetch.mock.calls).toMatchSnapshot();
  });
});
