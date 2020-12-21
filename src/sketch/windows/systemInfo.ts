import { BrowserOptions } from '@/modules/windowsBrowser';
import { getWinURL } from '@/utils/windows';

export const systemInfoWindow: BrowserOptions = {
  alwaysOnTop: true,
  id: 'system-info',
  width: 240,
  height: 300,
  title: '系统信息',
  show: false,
  resizable: false,
  hidesOnDeactivate: false,
  url: getWinURL('home'),
};
