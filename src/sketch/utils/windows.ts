export const getWinURL = (win: string) => {
  const isDev = process.env.NODE_ENV === 'development';

  console.log(process.env.NODE_ENV);

  const devUrl = `http://localhost:8110/#/${win}.html`;
  const prodUrl = `../Resources/${win}.html`;

  return isDev ? devUrl : prodUrl;
};
