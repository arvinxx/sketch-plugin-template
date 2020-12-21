/**
 * openUrlInBrowser 浏览器打开链接
 * @param {string} url
 */
export const penUrlInBrowser = (url) => {
  NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
};

/**
 * getNewUUID 获取唯一 ID
 */
export const getUUID = () => NSUUID.UUID().UUIDString();

/**
 * 获取插件文件夹路径
 * @param context
 */
export const getPluginFolderPath = (context) => {
  // Get absolute folder path of plugin
  const split = context.scriptPath.split('/');
  split.splice(-3, 3);
  return split.join('/');
};

/**
 * getThreadDictForKey 获取挂载 mainThread 的键值
 * @param {string} key
 */
export const getThreadDictForKey = (key: string) =>
  NSThread.mainThread().threadDictionary()[key];

/**
 * setThreadDictForKey 挂载到 mainThread 的键值
 * @param {string} key
 * @param {string} value
 */
export const setThreadDictForKey = (key: string, value: string) =>
  (NSThread.mainThread().threadDictionary()[key] = value);

/**
 * removeThreadDictForKey 移除挂载到 mainThread 的键值
 * @param { string } key
 */
export const removeThreadDictForKey = (key) => {
  if (NSThread.mainThread().threadDictionary()[key])
    NSThread.mainThread().threadDictionary().removeObjectForKey(key);
};

/**
 * showPluginsPane 显示 plugin window
 */
export const showPluginsPane = () => {
  const identifier = MSPluginsPreferencePane.identifier();
  const preferencesController = MSPreferencesController.sharedController();
  preferencesController.switchToPaneWithIdentifier(identifier);
  preferencesController.currentPreferencePane().tableView().reloadData();
};

/**
 * showLibrariesPane 显示 libraries window
 */
export const showLibrariesPane = () => {
  const identifier = MSAssetLibrariesPreferencePane.identifier();
  const preferencesController = MSPreferencesController.sharedController();
  preferencesController.switchToPaneWithIdentifier(identifier);
  preferencesController.currentPreferencePane().tableView().reloadData();
};

/**
 * reloadPlugins 重载插件
 */
export const reloadPlugins = () => {
  AppController.sharedInstance().pluginManager().reloadPlugins();
};

/**
 * getFileContentFromModal 打开文件选择器，获取文件的文本内容
 * @param {Array<string>} fileTypes 文件类型
 */
export const getFileContentFromModal = (fileTypes = []) => {
  const openPanel = NSOpenPanel.openPanel();

  // @ts-ignore
  openPanel.setTitle('Choose a JSON File');
  // @ts-ignore
  openPanel.setCanCreateDirectories(false);
  // @ts-ignore
  openPanel.setCanChooseFiles(true);
  // @ts-ignore
  openPanel.allowedFileTypes = fileTypes;

  const openPanelButtonPressed = openPanel.runModal();
  if (openPanelButtonPressed === NSModalResponseOK) {
    const filePath = openPanel.URL().path();
    return NSString.stringWithContentsOfFile_encoding_error(
      filePath,
      NSUTF8StringEncoding,
      nil
    );
  }

  return '';
};

/**
 * getSavePathFromModal 获取文件的存储路径
 * @param {String} fileName 文件名
 * @param {Array<string>} fileTypes 文件类型
 */
export const getSavePathFromModal = (fileName, fileTypes = ['json']) => {
  if (!fileName) return;
  const savePanel = NSSavePanel.savePanel();
  // @ts-ignore
  savePanel.setCanCreateDirectories(true);
  savePanel.nameFieldStringValue = fileName;
  // @ts-ignore
  savePanel.allowedFileTypes = fileTypes;

  const savePanelActionStatus = savePanel.runModal();
  if (savePanelActionStatus === NSModalResponseOK) {
    const filePath = savePanel.URL().path();
    return {
      filePath,
      fileName: savePanel.nameFieldStringValue(),
    };
  }

  return false;
};
