// 模块路径
export const ROUTER = {
  root: '/',
  resume: '/resume',
  templateList: '/templateList',
};

export const ROUTER_ENTRY: TSRouter.Item[] = [
  {
    text: '介绍',
    link: ROUTER.root,
  },
  {
    text: '简历',
    link: ROUTER.resume,
  },
  {
    text: '模板',
    link: ROUTER.templateList,
  },
  {
    text: '作品',
    link: 'https://github.com/kakachake',
  },
];
