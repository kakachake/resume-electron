import { createSlice } from '@reduxjs/toolkit';
import { IntactResume, SliderItem } from '../../common/types/resume';
import { RESUME_TOOLBAR_MAPS } from '../../constants/resume';

export interface ResumeState {
  toolbarList: {
    isAdd: SliderItem[];
    isNotAdd: SliderItem[];
  };
  resume: Partial<IntactResume>;
  resumeToolbarKeys: (keyof typeof RESUME_TOOLBAR_MAPS)[]; //“已添加模块”的所有 key
}

const initialState: ResumeState = {
  toolbarList: {
    isAdd: [],
    isNotAdd: [],
  },
  resume: {
    // base: {
    //   avatar: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
    //   name: 'xxx',
    //   date: '2022-10-10',
    //   area: '哈尔滨',
    //   school: '哈尔滨xx大学',
    //   major: '计算机科学与技术专业',
    //   degree: '硕士',
    //   nativePlace: '地球',
    //   political: '群众',
    //   age: 22,
    // },
    // certificate: [
    //   {
    //     name: '英语四级',
    //     date: '2022-10-10',
    //   },
    //   {
    //     name: '英语六级',
    //     date: '2022-10-10',
    //   },
    // ],
    // evaluation:
    //   '具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境|具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神。',
    // contact: {
    //   phone: '156xxxxxxxx',
    //   email: 'xxxx@foxmail.com',
    //   github: 'https://github.com/xxxx',
    //   juejin: 'https://juejin.cn/user/xxxx',
    // },
    // skill: [
    //   {
    //     desc: '熟悉 Vue.js，了解数据双向绑定原理、阅读过 NextTick 源码',
    //   },
    //   {
    //     desc: '熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码',
    //   },
    //   {
    //     desc: '熟悉 Node.js，了解 Express 框架、阅读过 Koa 源码',
    //   },
    //   {
    //     desc: '熟悉 TypeScript，了解其类型系统、阅读过 Redux 源码',
    //   },
    //   {
    //     desc: '阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库',
    //   },
    //   {
    //     desc: '熟悉 Webpack，了解其原理、阅读过 Webpack 源码',
    //   },
    //   {
    //     desc: '熟悉 Git，了解其原理、阅读过 Git 源码',
    //   },
    //   {
    //     desc: '熟悉 Linux，了解其原理、阅读过 Linux 源码',
    //   },
    //   {
    //     desc: '熟悉 MySQL，了解其原理、阅读过 MySQL 源码',
    //   },
    // ],
    // workExperience: [
    //   {
    //     department: 'xxxx',
    //     post: '前端开发工程师',
    //     beginTime: '2021-10-10',
    //     endTime: '2022-12-10',
    //     content:
    //       '- 👋 Hi, I’m @kakachake\n- 📫 Email:  theeasylife@foxmail.com\n- 💻 Blog: https://kakachake.github.io/\n\n<h2>My Open Source🚩</h2>\n\n| 开源项目 | 简介 | 类型 |\n| --- | --- | --- |\n|<a href="https://github.com/kakachake/cloud_music_monorepo">React Netease Music</a>| 一个基于 React、TypeScript 的高仿网易云播放器 | 练手项目 |\n|<a href="https://github.com/kakachake/mini_zvm">mini_zvm</a>| 简化版的vue实现 | 源码实现 |\n|<a href="https://github.com/kakachake/mini-react-router">mini-react-router</a>| 从 0 到 1 实现的 react router 路由功能 | 源码实现 |\n\n',
    //   },
    // ],
    // projectExperience: [
    //   {
    //     projectName: '网易云',
    //     post: '前端工程师',
    //     beginTime: '2021-10-10',
    //     endTime: '2022-12-10',
    //     content: `- 哈哈哈哈哈
    //       - 哈哈哈哈哈哈哈
    //       - 哈哈哈哈哈哈哈`,
    //   },
    // ],
  },
  resumeToolbarKeys: [],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setToolBarList: (state, action) => {
      state.toolbarList = action.payload;
      state.resumeToolbarKeys = action.payload.isAdd.map((item: any) => item.key);
    },
    updateResume: (
      state,
      action: {
        payload: {
          key: keyof IntactResume;
          value: Partial<IntactResume[keyof IntactResume]>;
        };
      }
    ) => {
      const { key, value } = action.payload;
      (state.resume as any)[key] = value;
    },
    addResume(
      state,
      action: {
        payload: {
          key: string;
        };
      }
    ) {
      const {
        payload: { key },
      } = action;
      if ((state.resume as any)[key] === undefined) {
        (state.resume as any)[key] = createResumeItem(key);
      }
    },
    removeResume: (
      state,
      action: {
        payload: keyof IntactResume;
      }
    ) => {
      delete (state.resume as any)[action.payload];
    },
  },
});

function createResumeItem(key: string) {
  switch (key) {
    case 'skill':
    case 'certificate':
    case 'projectExperience':
    case 'workExperience':
    case 'schoolExperience':
      return [];
    case 'evaluation':
      return '';
    default:
      return {};
  }
}

export const { setToolBarList, addResume, removeResume, updateResume } =
  resumeSlice.actions;

export default resumeSlice.reducer;
