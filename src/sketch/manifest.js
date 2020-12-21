const { identifier, name } = require('./identifier');

const commandList = [
  // {
  //   name: 'Action Listener',
  //   noshortcut: true,
  //   identifier: `${identifier}.action`,
  //   script: './app.ts',
  //   handlers: {
  //     actions: {
  //       OpenDocument: 'onOpenDocument',
  //       CloseDocument: 'onCloseDocument',
  //       'SelectionChanged.finish': 'onSelectionChanged',
  //     },
  //   },
  // },
  {
    name: 'toggle Side Panel',
    identifier: `${identifier}.toggle-side-panel`,
    script: './modules/sidebar/index.ts',
    shortcut: 'ctrl command k',
    handlers: {
      run: 'onToggleSidePanel',
      actions: {
        // OpenDocument: 'onOpenDocument',
        // CloseDocument: 'onCloseDocument',
        // Shutdown: 'onShutdown',
      },
    },
  },
  {
    name: 'Plugin Info',
    identifier: `${identifier}.system-info`,
    script: './app.ts',
    handler: 'systemInfo',
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
      `${identifier}.toggle-side-panel`,
      '-',
      `${identifier}.system-info`,
    ],
  },
};
