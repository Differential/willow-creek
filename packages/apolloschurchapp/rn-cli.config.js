const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const localDeps = [path.resolve('..', 'apollos-ui-kit')];

module.exports = {
  resolver: {
    extraNodeModules: {
      'react-native': path.resolve('.', 'node_modules/react-native'),
      'react-native-linear-gradient': path.resolve(
        '.',
        'node_modules/react-native-linear-gradient'
      ),
    },
    blacklistRE: blacklist([
      ...localDeps.map(
        (depPath) => new RegExp(`${depPath}/node_modules/react-native/.*`)
      ),
      ...localDeps.map(
        (depPath) =>
          new RegExp(`${depPath}/node_modules/react-native-linear-gradient/.*`)
      ),
      new RegExp(
        `${path.resolve('..', '..', 'node_modules', 'react-native')}/.*`
      ),
      new RegExp(
        `${path.resolve('..', '..', 'node_modules')}/.*/react-native/.*`
      ),
      new RegExp(
        `${path.resolve('../../node_modules/react-native-linear-gradient')}/.*`
      ),
    ]),
  },
  watchFolders: [...localDeps, path.resolve('..', '..', 'node_modules')],
};
