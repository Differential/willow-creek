import path from 'path';
import ApollosConfig from '@apolloschurch/config';

ApollosConfig.loadYaml({
  configPath: path.join(__dirname, '..', 'config.yml'),
});
