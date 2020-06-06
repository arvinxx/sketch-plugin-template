import { homeWin } from '@/sketch/windows';
import { systemInfo as systemInfoCmd } from '@/sketch/commands';

/**
 * hello 方法
 */
export const systemInfo = systemInfoCmd;

export const panel = () => {
  console.log('启动 home 窗口');
  homeWin();
};
