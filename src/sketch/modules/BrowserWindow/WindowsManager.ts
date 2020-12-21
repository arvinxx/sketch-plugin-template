import { Window, WindowOptions } from './Window';
import { getIdentifier } from '@/utils';
import { windowsList } from '@/windows';

/**
 * 窗口管理器
 */
export class WindowsManager {
  constructor() {
    console.log('窗口初始化');
    windowsList.forEach((options) => {
      this.list.push(WindowsManager.create(options));
    });
  }
  /**
   * 窗口列表
   */
  list: Window[] = [];

  /**
   * 添加窗口
   * @param browser
   */
  add(browser) {
    this.list.push(browser);
  }

  /**
   * 根据 id 查找窗口
   * @param identifier
   */
  get(identifier) {
    return this.list.find((d) => d.identifier === identifier);
  }

  /**
   * 获取当前窗口
   */
  getCurrent() {
    return this.list.find((d) => d.browserWindow.isVisible());
  }

  /**
   * 清空列表
   */
  empty() {
    this.list = [];
  }

  /**
   * 创建窗口
   * @param options
   */
  static create(options: WindowOptions) {
    return new Window({
      ...options,
      identifier: getIdentifier(options.id),
    });
  }
}
