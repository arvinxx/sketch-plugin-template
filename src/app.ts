import { initWin } from "@/windows";

declare global {
  namespace NodeJS {
    interface ProcessVersions {
      plugin: string;
      sketch: string;
    }
  }
}

/**
 * hello 方法
 */
export const systemInfo = (context: Sketch.Context) => {
  console.info("=======System Info=======");
  console.info(`Plugin Title: ${process.title}`);
  console.info(`Plugin Version: ${process.versions.plugin}`);
  console.info(`Sketch Version: ${process.versions.sketch}`);
  console.info("=======System End=======");

  context.document.showMessage("Hello Pan~🥘");
};

export const panel = () => {
  console.log("启动 init 窗口");
  initWin();
};
