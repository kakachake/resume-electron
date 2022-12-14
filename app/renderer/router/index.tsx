import Root from '@src/pages/root/Root';
import { FC, lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { useTemplateList } from '../hooks/useTemplateList';
import { useInitThemeConfig } from '../hooks/useThemeActionHooks';
import ComT from '../pages/comT/comT';

// import Resume from '../pages/resume/Resume';

const Resume = lazy(() => import('../pages/resume/Resume'));
const TemplateList = lazy(() => import('../pages/templateList/TemplateList'));

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
    path: 'resume/:id',
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Resume />
      </Suspense>
    ),
  },
  {
    name: 'templateList',
    path: 'templateList',
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <TemplateList />
      </Suspense>
    ),
  },
  {
    name: 'comT',
    path: 'comT',
    element: <ComT />,
  },
];

export const GetRoute: FC = () => {
  console.log('route Render');
  useInitThemeConfig();
  useTemplateList();
  const routes = useRoutes(route);
  return routes;
};
