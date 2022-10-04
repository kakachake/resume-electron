import Root from '@src/pages/root/Root';
import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import ComT from '../pages/comT/comT';
import Resume from '../pages/resume/Resume';
export const route: (RouteObject & {
  name: string;
})[] = [
  {
    name: 'root',
    path: '/',
    element: <Root />,
  },
  {
    name: 'resume',
    path: 'resume',
    element: <Resume />,
  },
  {
    name: 'comT',
    path: 'comT',
    element: <ComT />,
  },
];

export const GetRoute: FC = () => {
  const routes = useRoutes(route);
  return routes;
};
