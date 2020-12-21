const { identifier, name } = require('./identifier');

const commandList = [
  {
    name: 'Window Manager init',
    noshortcut: true,
    identifier: `${identifier}.init`,
    script: './app.ts',
    handlers: {
      actions: {
        OpenDocument: 'onOpenDocument',
        CloseDocument: 'onCloseDocument',
        'SelectionChanged.finish': 'onSelectionChanged',
      },
    },
  },
  {
    name: 'Plugin Info',
    identifier: `${identifier}.system-info`,
    script: './app.ts',
    handler: 'toggleSystemInfoPanel',
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
