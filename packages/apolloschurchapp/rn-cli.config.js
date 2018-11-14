/**
 * This file is mainly copy-pasta scattered throughout the interwebs.
 * I'll try and leave comments to make it easier to understand what's going on,
 * but essentially this file is currently required to get react-native to play nice
 * with yarn workspaces.
 */
const path = require('path');
const fs = require('fs');
const blacklist = require('metro/src/blacklist');
const getWorkspaces = require('get-yarn-workspaces');

/**
 * used to resolve node_modules that might be symlinked by yarn
 */
function getNodeModulesForDirectory(rootPath) {
  const nodeModulePath = path.join(rootPath, 'node_modules');
  const folders = fs.readdirSync(nodeModulePath);
  return folders.reduce((modules, folderName) => {
    const folderPath = path.join(nodeModulePath, folderName);
    if (folderName.startsWith('@')) {
      const scopedModuleFolders = fs.readdirSync(folderPath);
      const scopedModules = scopedModuleFolders.reduce(
        (scopedModules, scopedFolderName) => {
          scopedModules[
            `${folderName}/${scopedFolderName}`
          ] = maybeResolveSymlink(path.join(folderPath, scopedFolderName));
          return scopedModules;
        },
        {}
      );
      return Object.assign({}, modules, scopedModules);
    }
    modules[folderName] = maybeResolveSymlink(folderPath);
    return modules;
  }, {});
}

function maybeResolveSymlink(maybeSymlinkPath) {
  if (fs.lstatSync(maybeSymlinkPath).isSymbolicLink()) {
    const resolved = path.resolve(
      path.dirname(maybeSymlinkPath),
      fs.readlinkSync(maybeSymlinkPath)
    );
    return resolved;
  }
  return maybeSymlinkPath;
}

const pkgDir = path.resolve('.');
const workspaces = getWorkspaces(pkgDir);

/**
 * Options used by Metro builder
 */
module.exports = {
  extraNodeModules: getNodeModulesForDirectory(path.resolve('.')),
  // extraNodeModules: {
  //   'react-native': path.resolve('.', 'node_modules/react-native'),
  // },
  getBlacklistRE() {
    return blacklist([
      ...workspaces
        .filter((p) => !p.includes(pkgDir))
        .map(
          (workspacePath) =>
            new RegExp(`${workspacePath}/node_modules/react-native/.*`)
        ),
      /node_modules\/.*\/node_modules\/react-native\/.*/,
    ]);
  },
  // I think this is the most important bit here - without this, a lot of modules aren't resolving
  getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(pkgDir),

      // Include your forked package as a new root.
      path.resolve('..', '..', 'node_modules'),
    ];
  },
};
