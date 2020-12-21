// const fiber = createFiber();
import { initManager } from '@/modules/windowsBrowser';
import { message } from 'sketch/ui';

export * from './commands/systemInfo';

export const onOpenDocument = () => {
  console.error('✅✅ my-plugins start');
  COScript.currentCOScript().setShouldKeepAround(true);
  initManager();
  setTimeout(() => {
    message('💎 启动插件');
  }, 100);
};

// handler cleanly Long-running script
export function onShutdown() {
  console.error('✅✅ my-plugins onShutdown');

  // fiber.cleanup();
  COScript.currentCOScript().setShouldKeepAround(false);
}

export const onCloseDocument = () => {
  onShutdown();
};
