export const getWinURL = (win: string) => {
  const isProd = false;
  const devUrl = `http://localhost:8110/#/${win}.html`;
  const prodUrl = `../Resources/${win}.html`;

  return isProd ? prodUrl : devUrl;
};
