import ApollosConfig from '../index';

describe('the yaml loader', () => {
  it('must load variables from a js object', () => {
    ApollosConfig.loadJs({
      ROCK: {
        API_URL: 'https://some-url.com',
      },
      BIBLE_API: {
        API_TOKEN: 'foobar',
      },
    });
    expect(ApollosConfig.config).toMatchSnapshot();
  });
});
