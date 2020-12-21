const { identifier, name } = require('./identifier');

const commandList = [
  {
    name: 'Plugin Info',
    identifier: `${identifier}.system-info`,
    script: './app.ts',
    handlers: 'toggleSystemInfoPanel',
  },
];

module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  name,
  homepage: 'https://github.com/arvinxx/sketch-plugin-template#readme',
  identifier,
  icon: 'logo.png',
  commands: commandList,
  menu: {
    title: name,
    items: [
      // `${identifier}.init`,
      '-',
      `${identifier}.system-info`,
    ],
  },
};
