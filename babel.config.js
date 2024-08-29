module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '~assets': './src/assets/index.ts',
            '~components': './src/components/index.ts',
            '~constants': './src/constants/index.ts',
            '~helpers': './src/helpers/index.ts',
            '~hooks': './src/hooks/index.ts',
            '~navigation': './src/navigation/index.ts',
            '~redux': './src/redux/index.ts',
            '~screens': './src/screens/index.ts',
            '~services': './src/services/index.ts',
            '~types': './src/types/index.ts',
            '~utils': './src/utils/index.ts',
            '~users': './src/users/index.ts',
            '~base': './src/base/index.ts',
          },
        },
      ],
    ],
  };
};
