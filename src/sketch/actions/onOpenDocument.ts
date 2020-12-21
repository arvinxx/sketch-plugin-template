import { toggleSidePanel } from '@/commands';

/**
 * 当开启文档时的操作
 * @param context
 */
export const onOpenDocument = (context) => {
  setTimeout(() => {
    toggleSidePanel(context);
  }, 100);
};
