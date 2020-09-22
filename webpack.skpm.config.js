const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {boolean} isPluginCommand - whether the config is for a plugin command or an asset
 **/
module.exports = function(config, isPluginCommand) {
  const isDev = process.env.NODE_ENV === 'development';

  // 修改 skpm 复制到 build 目录的方法
  config.module.rules[1].use.query = {
    raw: true,
    outputPath(url) {
      return path.posix.join('..', 'Resources', url);
    },
    publicPath(url) {
      return `"file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/${url}"`;
    },
  };

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: [/node_modules/],
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev,
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          reportFiles: ['src/sketch/**/*.ts'],
        },
      },
    ],
  });

  if (!config.resolve) {
    config.resolve = {
      extensions: [],
    };
  }
  config.resolve.alias = {
    '@': path.resolve(__dirname, './src'),
  };

  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx'];

  // transformations for production (publish)
  if (!isDev) {
    config.mode = 'production';
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          test: /\.j|ts($|\?)/i,
        }),
      ],
    };
  }
};
