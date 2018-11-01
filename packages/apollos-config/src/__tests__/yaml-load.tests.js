import path from 'path';
import ApollosConfig from '../index';

describe('the yaml loader', () => {
  it('must load variables from a yaml', () => {
    process.env.ROCK_TOKEN = 'some-rock-token';
    process.env.SOME_VALUE = 'this is a value';
    process.env.ANOTHER_VALUE = 'this is another value';
    process.env.CONTENT_ID_FROM_ENV = 10;

    ApollosConfig.loadYaml({
      configPath: path.join(__dirname, 'test.yml'),
    });
    expect(ApollosConfig.ROCK.API_TOKEN).toEqual(process.env.ROCK_TOKEN);
    expect(ApollosConfig.config).toMatchSnapshot();
  });
});
