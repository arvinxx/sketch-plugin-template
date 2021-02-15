import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/BridgeLayout',
    routes: [
      {
        path: '/home',
        exact: true,
        component: './home',
      },
    ],
  },
];

export default routes;
