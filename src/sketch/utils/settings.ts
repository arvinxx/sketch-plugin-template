import { Settings } from 'sketch';
import { Document, Override, Layer } from 'sketch/dom';
import { DataOverride } from 'sketch/data-supplier';

type StoreLayer = Layer | Override | DataOverride | Document;

/**
 * 读取配置
 * @param {String} key
 */
export const getSettings = <T = any>(key: string): T => {
  const settings = Settings.settingForKey(key);
  if (settings) return JSON.parse(settings);
  else return settings;
};

/**
 * 设置配置
 * @param {String} key
 * @param {*} value
 */
export const setSettings = <T = any>(key: string, value: T): void => {
  Settings.setSettingForKey(key, value ? JSON.stringify(value) : value);
};

/**
 * removeSettingForKey 移除挂载到 NSUserDefaults 的键值
 * @param { string } key
 */
export const removeSettings = (key) => {
  setSettings(key, undefined);
};

/**
 * 设置配置
 * @param layer 图层
 * @param {String} key
 * @param value
 */
export const setLayerData = <T = any>(
  layer: StoreLayer,
  key: SketchStoreKey,
  value: T
): void => {
  if (layer instanceof Document) {
    Settings.setDocumentSettingForKey(layer, key, JSON.stringify(value));
    return;
  }

  Settings.setLayerSettingForKey(layer, key, JSON.stringify(value));
};
/**
 * 读取配置
 * @param layer 图层
 * @param {String} key
 */
export const getLayerData = <T = any>(
  layer: StoreLayer,
  key: SketchStoreKey
): T => {
  let data;
  if (layer instanceof Document) {
    data = Settings.documentSettingForKey(layer, key);
    if (data) return JSON.parse(data);
    else return data;
  }

  data = Settings.layerSettingForKey(layer, key);
  if (data) return JSON.parse(data);
  else return data;
};

/**
 * 设置全局值
 * @param {String} key
 * @param value
 */
export const setGlobalData = <T = any>(key: SketchStoreKey, value: T): void => {
  Settings.setGlobalSettingForKey(key, JSON.stringify(value));
};
/**
 * 设置全局值
 * @param {String} key
 * @param value
 */
export const setRawGlobalData = <T = any>(
  key: SketchStoreKey,
  value: T
): void => {
  Settings.setGlobalSettingForKey(key, value);
};

/**
 * 读取全局值
 * @param {String} key
 */
export const getGlobalData = <T = any>(key: SketchStoreKey): T => {
  let data = Settings.globalSettingForKey(key);
  if (data) return JSON.parse(data);
  else return data;
};
