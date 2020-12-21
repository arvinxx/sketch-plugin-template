import { BrowserWindow } from 'sketch-module-web-view';

import { ChannelType } from '@/bridge/channel';
/**
 * 向 windowsBrowser 发送消息
 * @param {BrowserWindow} window 指令的窗口
 * @param {ChannelType} channel 通信信道
 * @param {*} data 需要发送的数据
 */
export const sendMsgToWebView = async (
  window: BrowserWindow,
  channel: ChannelType,
  data?: any
) => {
  const args = `'${channel}'${data ? `,'${JSON.stringify(data)}'` : ''}`;
  const func = `onReceiveEndMsg(${args})`;
  return await window.webContents.executeJavaScript(func);
};
