module.exports = function (api) {
  api.cache(true);
  return {
      presets: ['module:@react-native/babel-preset'],
      plugins: [
          [
              'module:react-native-dotenv',
              {
                  envName: 'APP_ENV',
                  moduleName: '@env',
                  path: '.env',
                  safe: false,
                  allowUndefined: true,
                  verbose: false,
              },
          ],
          [
              'module-resolver',
              {
                  root: ['./'],
                  alias: {
                      '@assets': './assets',
                      '@config': './assets',
                      '@components': './src/components',
                      '@i18n': './src/i18n',
                      '@navigators': './src/navigators',
                      '@reducers': './src/reducers',
                      '@screens': './src/screens',
                      '@services': './src/services',
                      '@store': './src/store',
                      '@theme': './src/theme',
                      '@appTypes': './src/types',
                      '@utils': './src/utils',
                      '@helpers': './src/helpers',
                      '@constants': './src/constants',
                      '@validations': './src/validations',
                  },
                  extensions: ['.js', '.jsx', '.ts', '.tsx'],
              },
          ],
          'react-native-reanimated/plugin',
      ],
  };
};
