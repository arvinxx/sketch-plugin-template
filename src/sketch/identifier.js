const isDev = process.env.NODE_ENV === 'development';

let WINDOW_MOVE_INSTANCE = '';

let WINDOW_MOVE_SELECTOR = '';

const id = `sketch-plugin-template${isDev ? '.dev' : ''}`;

module.exports = {
  name: `Sketch Plugin Template${isDev ? ' DEV' : ''}`,
  identifier: id,
  sidePanelIdentifier: `${id}-side-panel`,
  WINDOW_MOVE_INSTANCE,
  WINDOW_MOVE_SELECTOR,
  updateWindowsMoveInstanceId: (id) => {
    WINDOW_MOVE_INSTANCE = id;
  },
  updateWindowsMoveSelectorId: (id) => {
    WINDOW_MOVE_SELECTOR = id;
  },
};
