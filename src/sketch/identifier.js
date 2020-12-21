const isDev = process.env.NODE_ENV === 'development';

const id = `sketch-plugin-template${isDev ? '.dev' : ''}`;

module.exports = {
  name: `Sketch Plugin Template${isDev ? ' DEV' : ''}`,
  identifier: id,
};
