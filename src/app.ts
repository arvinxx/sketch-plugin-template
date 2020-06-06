import { initWin } from '@/sketch/windows';
import { systemInfo as systemInfoCmd } from '@/sketch/commands';

declare global {
  namespace NodeJS {
    interface ProcessVersions {
      plugin: string;
      sketch: string;
    }
  }
}

/**
 * hello 方法
 */
export const systemInfo = systemInfoCmd;

export const panel = () => {
  console.log('启动 init 窗口');
  initWin();
};
