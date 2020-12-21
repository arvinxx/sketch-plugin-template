import BrowserWindow from 'sketch-module-web-view';
import { getAbsScreenOfTop, getAbsWindowOfView } from './utils';
import { browserManager } from './BrowserManager';

export class Browser {
  constructor(options) {
    this.options = Object.assign(
      {
        width: 290,
        height: 550,
        minimizable: false,
        resizable: false,
        transparent: false,
        closable: false,
        center: false,
        alwaysOnTop: true,
        titleBarStyle: 'hiddenInset',
        frame: false,
        show: false,
      },
      options
    );

    this.identifier = options.identifier;

    browserManager.list.forEach((d) => {
      if (d.identifier != this.identifier) {
        if (d.browserWindow.isVisible()) {
          d.hide();
        }
      }
    });

    const existBrowser = browserManager.get(options.identifier);
    if (existBrowser) {
      if (existBrowser.browserWindow.isVisible()) {
        existBrowser.hide();
      } else {
        existBrowser.show();
      }
      return existBrowser;
    }

    this.browserWindow = new BrowserWindow(options);
    options.url && this.browserWindow.loadURL(options.url);
    // this.browserWindow._panel.setStyleMask(NSWindowStyleMaskDocModalWindow);
    browserManager.add(this);
    this.show();
  }
  options: any;
  identifier: string;
  browserWindow: BrowserWindow;

  /**
   * 显示窗口
   */
  show() {
    this.updatePosition();
    // const documentWindow = context.document.documentWindow();
    // documentWindow.addChildWindow_ordered(this.browserWindow._panel, true);

    this.browserWindow.show();
  }

  hide() {
    this.browserWindow.hide();
    if (this.browserWindow.webContents) {
      this.browserWindow.webContents.removeAllListeners();
    }
  }

  updatePosition() {
    const { sender, inGravityType } = this.options;
    const [width, height] = this.browserWindow.getSize();
    const winRect = getAbsScreenOfTop();
    const senderRect = getAbsWindowOfView(sender);
    const x =
      winRect.origin.x +
      senderRect.origin.x -
      sender.frame().origin.x -
      width -
      1;

    if (inGravityType === 1) {
      const y = winRect.origin.y + senderRect.origin.y + 24 - height + 8;
      // @ts-ignore
      this.browserWindow._panel.setFrame_display(
        NSMakeRect(x, y, width, height),
        true
      );
    } else if (inGravityType === 3) {
      const y = winRect.origin.y;
      // @ts-ignore
      this.browserWindow._panel.setFrame_display(
        NSMakeRect(x, y, width, height),
        true
      );
    }
  }
}
