import { Browser, BrowserOptions } from './Browser';
import { getIdentifier } from '@/utils';

/**
 * 窗口管理器
 */
class BrowserManager {
  /**
   * 窗口列表
   */
  list: Browser[] = [];

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
  create(options: BrowserOptions) {
    return new Browser({
      ...options,
      identifier: getIdentifier(options.id),
    });
  }
}

export const browserManager = new BrowserManager();
