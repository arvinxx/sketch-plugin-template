import { updateAppcast } from './appcast';
import { releaseZip } from './zip';

(async () => {
  await releaseZip();
  console.info(`🏷 更新 appcast...`);
  await updateAppcast();
  console.info(`✅  更新完成!`);
})();
