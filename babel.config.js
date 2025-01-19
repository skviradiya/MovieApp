module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx','.json'],
          alias: {
            '@App': './App',
          },
        },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blocklist: null,
      allowlist: null,
      safe: false,
      allowUndefined: true,
    }],
],
};
