declare global {
  function log(message: string): void;
}

export const console = {
  log: log,
};
