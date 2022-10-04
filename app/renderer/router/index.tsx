import Root from '@src/pages/root/Root';
import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
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
];

export const GetRoute: FC = () => {
  const routes = useRoutes(route);
  return routes;
};
