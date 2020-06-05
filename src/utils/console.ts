declare global {
  function log(...args: any[]): void;
  function log(...args: any[]): void;
}

export default {
  log: log,
  error: console.error,
};
