import { getSketchVersion, getPluginVersion } from '@/utils/version';
import { browserManager } from '@/modules';
import { sendMsgToWebView } from '@/bridge';
import { getIdentifier } from '@/utils';

/**
 * 输出插件基本信息
 */
export const toggleSystemInfoPanel = (context: SketchContext) => {
  const win = browserManager.get(getIdentifier('system-info'));
  console.log(win);
  const env = process.env.NODE_ENV;
  const platform = process.type;
  const plugin = getPluginVersion();
  const sketch = getSketchVersion();

  console.info('=======System Info=======');
  console.info(`开发环境: ${env}`);
  console.info(`Plugin 版本: ${plugin}`);
  console.info(`插件平台: ${platform}`);
  console.info(`Sketch 版本: ${sketch}`);
  console.info('=======System End=======');
  context.document.showMessage('️查看系统信息⚙️');

  win.show();

  sendMsgToWebView(win.browserWindow, 'GLOBAL_SYSTEM_INFO', {
    env,
    plugin,
    sketch,
    platform,
  });
};
