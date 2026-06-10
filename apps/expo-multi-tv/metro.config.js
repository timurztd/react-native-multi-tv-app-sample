// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname); // eslint-disable-line no-undef
const appNodeModules = path.resolve(__dirname, 'node_modules');

// Configure Metro to work with Yarn workspaces
config.watchFolders = [
  path.resolve(__dirname, '../../packages/shared-ui'),
  path.resolve(__dirname, '../..'),
];

config.resolver = {
  ...config.resolver,
  unstable_enableSymlinks: true,
  disableHierarchicalLookup: true,
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../../node_modules'),
  ],
  extraNodeModules: {
    '@multi-tv/shared-ui': path.resolve(__dirname, '../../packages/shared-ui/src'),
    react: path.resolve(appNodeModules, 'react'),
    'react-dom': path.resolve(appNodeModules, 'react-dom'),
    'react-native': path.resolve(appNodeModules, 'react-native'),
    'react-native-web': path.resolve(appNodeModules, 'react-native-web'),
    '@babel/runtime': path.resolve(appNodeModules, '@babel/runtime'),
    '@bam.tech/lrud': path.resolve(appNodeModules, '@bam.tech/lrud'),
    '@react-navigation/core': path.resolve(appNodeModules, '@react-navigation/core'),
    '@react-navigation/drawer': path.resolve(appNodeModules, '@react-navigation/drawer'),
    '@react-navigation/elements': path.resolve(appNodeModules, '@react-navigation/elements'),
    '@react-navigation/native': path.resolve(appNodeModules, '@react-navigation/native'),
    '@react-navigation/native-stack': path.resolve(appNodeModules, '@react-navigation/native-stack'),
    '@react-navigation/routers': path.resolve(appNodeModules, '@react-navigation/routers'),
    'react-native-gesture-handler': path.resolve(appNodeModules, 'react-native-gesture-handler'),
    'react-native-video': path.resolve(appNodeModules, 'react-native-video'),
    'react-tv-space-navigation': path.resolve(appNodeModules, 'react-tv-space-navigation'),
  },
};

// When enabled, the optional code below will allow Metro to resolve
// and bundle source files with TV-specific extensions
// (e.g., *.ios.tv.tsx, *.android.tv.tsx, *.tv.tsx)
//
// Metro will still resolve source files with standard extensions
// as usual if TV-specific files are not found for a module.
//
if (process.env?.EXPO_TV === '1') {
  const originalSourceExts = config.resolver.sourceExts;
  const tvSourceExts = [
    ...originalSourceExts.map((e) => `tv.${e}`),
    ...originalSourceExts,
  ];
  config.resolver.sourceExts = tvSourceExts;
}

module.exports = config;
