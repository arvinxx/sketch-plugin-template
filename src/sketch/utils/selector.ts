import { getSelectedDocument, Artboard } from 'sketch';

/**
 * getSketchSelected
 * 获取当前选择的 document artboard page 和 selection
 */
export const getSketchSelected = () => {
  // 当前被选择的 document
  const document = getSelectedDocument();

  // 当前被选择的 page
  const page = document.selectedPage;

  // 当前选择画板
  const artboard = Artboard.fromNative(page.sketchObject.currentArtboard());

  // 当前选择图层
  const selection = document.selectedLayers;

  return { document, page, artboard, selection };
};

/**
 * getSelected 获取当前 document、page、artboard、selection
 */
export const getSelected = () => {
  const document = context.document; // 获取 sketch 当前 document
  const command = context.command;
  const page = document.currentPage(); // 当前被选择的 page
  const artboards = page.artboards(); // 所有的画板
  const selectedArtboard = page.currentArtboard(); // 当前被选择的画板
  const selection = context.selection; // 当前选择图层
  return {
    document,
    command,
    page,
    artboards,
    selectedArtboard,
    selection,
  };
};

/**
 * 获取当前脚本执行路径
 * @param {*} context
 */
export const getScriptExecPath = (context: SketchContext) => context.scriptPath;

/**
 * document 获取所选择 document objectID
 */
export const getDocumentID = () => context.document.documentData().objectID();

/**
 * getDocumentPath 获取所选择 document 路径
 */
export const getDocumentPath = () => {
  const Document = context.document;
  return Document.fileURL() ? Document.fileURL().path() : nil;
};

/**
 * getDocumentName 获取所选择 document name
 */
export const getDocumentName = () =>
  getDocumentPath() ? getDocumentPath().lastPathComponent() : nil;

/**
 * dumpLayer 导出json数据
 * @param {*} sketchObject  如 context.document.currentPage()
 */
export const dumpLayer = (sketchObject) => {
  // return NSDictionary
  const jsonData = sketchObject.treeAsDictionary();
  const nsData = NSJSONSerialization.dataWithJSONObject_options_error(
    jsonData,
    0,
    nil
  );
  return NSString.alloc().initWithData_encoding(nsData, 4);
};

/**
 * dumpSymbol 导出json数据
 * @param {*} symbolInstance // context.selection[0]
 */
export const dumpSymbol = (symbolInstance) => {
  // return symbolInstance
  const immutableInstance = symbolInstance.immutableModelObject();
  return MSJSONDataArchiver.archiveStringWithRootObject_error(
    immutableInstance,
    nil
  );
};
