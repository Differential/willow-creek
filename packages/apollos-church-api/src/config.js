import path from 'path';
import dotenv from 'dotenv/config'; // eslint-disable-line
import ApollosConfig from '@apolloschurch/config';

ApollosConfig.loadYaml({
  configPath: path.join(__dirname, '..', 'config.yml'),
});
