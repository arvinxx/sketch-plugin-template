declare module Sketch {
  interface Context {
    document: MSDocument;
  }

  interface MSDocument {
    showMessage(message: string): void;
  }
}

declare module "sketch-module-web-view";
declare module "sketch-module-web-view/remote";

declare module "sketch" {
  namespace UI {
    function message(msg: string): void;
  }
}
