import MochaJSDelegate from 'mocha-js-delegate';
import { sidePanelIdentifier, WINDOW_MOVE_INSTANCE, WINDOW_MOVE_SELECTOR } from '@/identifier';
import {
  getThreadDictForKey, removeSettings,
  removeThreadDictForKey, setSettings,
  setThreadDictForKey,
} from '../../utils';

/**
 * observerWindowResizeNotification 监听窗口resize
 * @param {*} fn
 */
export const observerWindowResizeNotification = (fn) => {
  // Keep script around, otherwise everything will be dumped once its run
  // COScript.currentCOScript().setShouldKeepAround(true)

  if (!getThreadDictForKey(WINDOW_MOVE_INSTANCE)) {
    // Create a selector
    const Selector = NSSelectorFromString('onWindowMove:');

    const delegate = new MochaJSDelegate({
      'onWindowMove:': (notification) => {
        // const bounds = NSScreen.mainScreen().frame()
        fn(notification);
        // log(notification)
        // NSNotificationCenter.defaultCenter().removeObserver_name_object(delegateInstance, NSWindowDidResizeNotification, nil)
      },
    });

    // Don't forget to create a class instance of the delegate
    const delegateInstance = delegate.getClassInstance();

    NSNotificationCenter.defaultCenter().addObserver_selector_name_object(
      delegateInstance,
      Selector,
      NSWindowDidResizeNotification,
      nil
    );

    setThreadDictForKey(WINDOW_MOVE_INSTANCE, delegateInstance);
    setThreadDictForKey(WINDOW_MOVE_SELECTOR, Selector);
  }
};

/**
 * removeObserverWindowResizeNotification 清除监听窗口resize
 * @param {*} fn
 */
export const removeObserverWindowResizeNotification = () => {
  const delegateInstance = getThreadDictForKey(WINDOW_MOVE_INSTANCE);
  if (delegateInstance) {
    NSNotificationCenter.defaultCenter().removeObserver_name_object(
      delegateInstance,
      NSWindowDidResizeNotification,
      nil
    );
    removeThreadDictForKey(WINDOW_MOVE_INSTANCE);
    removeThreadDictForKey(WINDOW_MOVE_SELECTOR);
  }
};




/**
 * insertSidePanel 插入侧边栏
 * @param {*} toolbar
 * @param {*} identifier
 * @param {*} isInsert  默认插入，已插入删除
 */
export const insertSidePanel = (toolbar, identifier, isInsert = false) => {
  const contentView = context.document.documentWindow().contentView();
  // @ts-ignore
  const stageView = contentView.subviews().objectAtIndex(0);

  const views = stageView.subviews();
  const existId =
    isInsert || views.find((d) => ''.concat(d.identifier()) === identifier);

  const finalViews = [];
  let pushedWebView = false;

  for (let i = 0; i < views.count(); i++) {
    const view = views[i];
    if (existId) {
      if (''.concat(view.identifier()) !== identifier) finalViews.push(view);
    } else {
      finalViews.push(view);
      if (!pushedWebView && ''.concat(view.identifier()) === 'view_canvas') {
        finalViews.push(toolbar);
        pushedWebView = true;
      }
    }
  }

  if (pushedWebView) {
    setSettings(sidePanelIdentifier, 'true');
  } else {
    removeSettings(sidePanelIdentifier);
  }

  stageView.subviews = finalViews;
  stageView.adjustSubviews();
};
