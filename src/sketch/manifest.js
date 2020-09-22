const isDev = process.env.NODE_ENV === 'development';
const name = `Sketch Plugin Template${isDev ? ' DEV' : ''}`;

const identifier = isDev
  ? 'sketch-plugin-template.dev'
  : 'sketch-plugin-template';
module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  name,
  homepage:
    'https://github.com/arvinxx/sketch-plugin-skpm-umi-typescript-example',
  identifier,
  icon: 'icons/logo.png',
  commands: [
    {
      name: 'Plugin Info',
      identifier: identifier + '.system-info',
      script: './app.ts',
      handler: 'systemInfo',
    },
  ],
  menu: {
    title: name,
    items: ['-', identifier + '.system-info'],
  },
};
