//@ts-nocheck
import initState from '@/utils/init';
import { identifier, sidePanelIdentifier } from '@/identifier';
import {
  observerWindowResizeNotification,
  removeObserverWindowResizeNotification,
  insertSidePanel,
} from './utils';
import {
  addButton,
  Browser,
  browserManager,
  createBoxSeparator,
  createImageView,
} from '@/utils';

import menus from './menus';

export const onToggleSidePanel = () => {
  initState();

  const threadDictionary = NSThread.mainThread().threadDictionary();
  if (threadDictionary[sidePanelIdentifier]) {
    insertSidePanel(
      threadDictionary[sidePanelIdentifier],
      sidePanelIdentifier,
      true
    );
    onShutdown();
    return;
  }

  // Long-running script
  COScript.currentCOScript().setShouldKeepAround(true);

  // observerWindowResizeNotification(() => {
  //   const curWebView = browserManager.getCurrent();
  //   if (curWebView) {
  //     curWebView.updatePosition();
  //   }
  // });

  const toolbar = NSStackView.alloc().initWithFrame(NSMakeRect(0, 0, 40, 400));
  threadDictionary[sidePanelIdentifier] = toolbar;
  toolbar.identifier = sidePanelIdentifier;
  toolbar.setSpacing(8);
  toolbar.setFlipped(true);
  toolbar.setBackgroundColor(NSColor.windowBackgroundColor());

  toolbar.orientation = 1;

  toolbar.addView_inGravity(
    createImageView(
      NSMakeRect(0, 0, 40, 22),
      'transparent',
      NSMakeSize(40, 22)
    ),
    1
  );
  const Logo = createImageView(
    NSMakeRect(0, 0, 40, 30),
    'logo',
    NSMakeSize(40, 28)
  );
  toolbar.addSubview(Logo);

  menus.forEach((item, index) => {
    const {
      rect = [0, 0, 40, 40],
      size = [24, 24],
      type = 2,
      inGravityType = 1,
      id,
      icon,
      activeIcon,
      tooltip,
    } = item;

    const Button = addButton({
      rect: NSMakeRect(...rect),
      size: NSMakeSize(...size),
      icon,
      activeIcon,
      tooltip,
      // identifier: `${identifier}-menu.${id}`,
      type,
      callAction: (sender) => {
        // log('sender', sender)
        const threadDictionary = NSThread.mainThread().threadDictionary();
        const menuBtnRegExp = new RegExp(`${identifier}-menu*`);
        for (const k in threadDictionary) {
          if (menuBtnRegExp.test(k) && k !== identifier) {
            threadDictionary[k].setState(NSOffState);
          }
        }

        const options = {
          sender,
          identifier: `${identifier}-webview.${id}`,
          frame: false,
          show: false,
          width: 320,
          height: 480,
          inGravityType,
        };

        const { browserWindow } = new Browser(options);

        const webView = browserWindow.webContents;

        webView.on('did-start-loading', () => {
          // console.error('did-start-loading')
        });

        webView.on('did-finish-load', () => {
          // console.error('did-finish-load')
        });

        webView.on('openView', () => {
          // console.error('openViewopenView')
        });
      },
    });

    threadDictionary[identifier] = Button;

    toolbar.addView_inGravity(createBoxSeparator(), inGravityType);
    toolbar.addView_inGravity(Button, inGravityType);

    if (icon === 'fill')
      toolbar.addView_inGravity(createBoxSeparator(), inGravityType);
    if (index === menus.length - 1)
      toolbar.addView_inGravity(
        createImageView(NSMakeRect(0, 0, 40, 8), 'transparent'),
        3
      );
  });

  insertSidePanel(toolbar, sidePanelIdentifier);
};

export const onOpenDocument = () => {};

export const onCloseDocument = () => {
  initState();
  onShutdown();
};

// handler cleanly Long-running script
export function onShutdown() {
  // console.error('✅✅ my-plugins onShutdown')
  const threadDictionary = NSThread.mainThread().threadDictionary();
  browserManager.empty();
  const prefixRegExp = new RegExp(`${identifier}*`);
  const webViewPrefixRegExp = new RegExp(`${identifier}-webview*`);

  // clear MSClass
  for (const key in threadDictionary) {
    if (prefixRegExp.test(key)) {
      if (webViewPrefixRegExp.test(key)) {
        threadDictionary[key].close();
      }
      // @ts-ignore
      threadDictionary.removeObjectForKey(key);
    }
  }

  // clear WindowResizeNotification
  removeObserverWindowResizeNotification();

  COScript.currentCOScript().setShouldKeepAround(false);
}
