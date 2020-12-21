import initState from '@/utils/init';
import { identifier } from '@/identifier';
import { createFiber } from 'sketch/async';
import { browserManager } from '@/utils';

const fiber = createFiber();

export const onInitManager = () => {
  // Long-running script
  // COScript.currentCOScript().setShouldKeepAround(true);
};

export const onCloseDocument = () => {
  initState();
  onShutdown();
};

// handler cleanly Long-running script
export function onShutdown() {
  // console.error('✅✅ my-plugins onShutdown')

  fiber.cleanup();
  // COScript.currentCOScript().setShouldKeepAround(false);
}
