const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const localDeps = [
  path.resolve('..', 'apollos-ui-kit'),
  path.resolve('..', 'apollos-ui-passes'),
  path.resolve('..', 'apollos-ui-auth'),
  path.resolve('..', 'apollos-ui-htmlview'),
  path.resolve('..', 'apollos-ui-analytics'),
];

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
      ...localDeps.map(
        (depPath) =>
          new RegExp(`${depPath}/node_modules/.*/node_modules/react-native/.*`)
      ),
      new RegExp(
        `${path.resolve('.', 'node_modules')}/.*/node_modules/react-native/.*`
      ),
      new RegExp(
        `${path.resolve('..', '..', 'node_modules', 'react-native')}/.*`
      ),
      new RegExp(
        `${path.resolve(
          '..',
          '..',
          'node_modules'
        )}/.*/node_modules/react-native/.*`
      ),
      new RegExp(
        `${path.resolve('../../node_modules/react-native-linear-gradient')}/.*`
      ),
    ]),
  },
  watchFolders: [...localDeps, path.resolve('..', '..', 'node_modules')],
};
