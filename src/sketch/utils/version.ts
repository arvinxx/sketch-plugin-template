declare global {
  namespace NodeJS {
    interface ProcessVersions {
      plugin: string;
      sketch: string;
    }
    interface Process {
      type: string;
    }
  }
}
export const getSketchVersion = () => {
  return process.versions.sketch;
};

export const getPluginVersion = () => {
  return process.versions.plugin;
};
