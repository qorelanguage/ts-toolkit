export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
    '@storybook/addon-webpack5-compiler-swc',
    '@chromatic-com/storybook',
  ],
  core: {},

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  // webpackFinal: async (config) => {
  //   // Add node externals to webpack config
  //   config.externals = [
  //     nodeExternals({
  //       allowlist: [/^node:/],
  //     }),
  //   ];

  //   // Return the altered config
  //   return config;
  // },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
