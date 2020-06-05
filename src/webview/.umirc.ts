import { defineConfig } from 'umi';
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: `../../resources`,
  history: { type: isDev ? 'hash' : 'browser' },
  exportStatic: { htmlSuffix: true, dynamicRoot: true },
});
