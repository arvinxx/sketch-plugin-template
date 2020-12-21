declare const NSMakeRect: (x, y, width, height) => cocoascript.NSRect;
declare const NSMakeSize: (width, height) => void;

declare const NSUTF8StringEncoding;
declare const NSSelectorFromString;
declare const AppController;

/**
 * 给 Store 部分的 key
 */
declare interface SketchStore {
  // Sketch 调整微调间距
  nudgeDistanceSmall: string;
}
declare type SketchStoreKey = keyof SketchStore;

declare const COScript;

declare namespace NodeJS {
  interface ProcessVersions {
    plugin: string;
    sketch: string;
  }
  interface Process {
    type: string;
  }
}
