import BrowserWindow, { BrowserWindowOptions } from 'sketch-module-web-view';

export interface WindowOptions extends BrowserWindowOptions {
  url: string;
  id: string;
}

export class Window {
  constructor(options: WindowOptions) {
    this.options = Object.assign({ show: false }, options);

    this.identifier = options.identifier;

    this.browserWindow = new BrowserWindow(options);

    if (options.url) {
      this.browserWindow.loadURL(options.url);
    }
  }

  options: BrowserWindowOptions;

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
    // const { sender, inGravityType } = this.options;
    // const [width, height] = this.browserWindow.getSize();
    // const winRect = getAbsScreenOfTop();
    // const senderRect = getAbsWindowOfView(sender);
    // const x =
    //   winRect.origin.x +
    //   senderRect.origin.x -
    //   sender.frame().origin.x -
    //   width -
    //   1;
    //
    // if (inGravityType === 1) {
    //   const y = winRect.origin.y + senderRect.origin.y + 24 - height + 8;
    //   // @ts-ignore
    //   this.browserWindow._panel.setFrame_display(
    //     NSMakeRect(x, y, width, height),
    //     true
    //   );
    // } else if (inGravityType === 3) {
    //   const y = winRect.origin.y;
    //   // @ts-ignore
    //   this.browserWindow._panel.setFrame_display(
    //     NSMakeRect(x, y, width, height),
    //     true
    //   );
    // }
  }
}
