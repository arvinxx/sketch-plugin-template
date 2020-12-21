/**
 * 生成窗口
 * @param button
 */
export const getAbsWindowOfView = (button) => {
  const bounds = button.bounds();
  const width = bounds.size.width;
  const height = bounds.size.height;
  const x = bounds.origin.x;
  const y = bounds.origin.y;
  return button.convertRect_toView(NSMakeRect(x, y, width, height), nil);
};
/**
 * 获取绝对定位
 */
export const getAbsScreenOfTop = () => {
  const contentView = context.document.documentWindow().contentView();
  // @ts-ignore
  const { width, height } = contentView.frame().size;
  // @ts-ignore
  const { x, y } = contentView.frame().origin;

  return context.document
    .window()
    .convertRectToScreen(NSMakeRect(x, y, width, height));
};
