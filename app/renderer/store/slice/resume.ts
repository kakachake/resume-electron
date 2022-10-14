import { createSlice } from '@reduxjs/toolkit';
import { IntactResume, SliderItem } from '../../common/types/resume';

export interface ResumeState {
  toolbarList: {
    isAdd: SliderItem[];
    isNotAdd: SliderItem[];
  };
  resume: Partial<IntactResume>;
  resumeToolbarKeys: []; //“已添加模块”的所有 key
}

const initialState: ResumeState = {
  toolbarList: {
    isAdd: [],
    isNotAdd: [],
  },
  resume: {
    base: {
      avatar: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png',
      name: '张泰民',
      date: '2022-10-10',
      area: '哈尔滨',
      school: '哈尔滨工程大学',
      major: '计算机科学与技术专业',
      degree: '硕士',
      nativePlace: '山东聊城',
      political: '党员',
      age: 22,
    },
    certificate: [
      {
        name: '英语四级',
        date: '2022-10-10',
      },
      {
        name: '英语六级',
        date: '2022-10-10',
      },
    ],
    evaluation:
      '投身开源，rc-redux-model 库作者，SugarTurboS Club 开源组织负责人| 掘金 lv3 博主，掘金文章 10w+ 阅读量，github blog 300+ star | 具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境|具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神。',
    contact: {
      phone: '15615538215',
      email: 'theeasylife@foxmail.com',
      github: 'https://github.com/kakachake',
      juejin: 'https://juejin.cn/user/1732486057168654',
    },
    skill: [
      {
        desc: '熟悉 Vue.js，了解数据双向绑定原理、阅读过 NextTick 源码',
      },
      {
        desc: '熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码',
      },
      {
        desc: '熟悉 Node.js，了解 Express 框架、阅读过 Koa 源码',
      },
      {
        desc: '熟悉 TypeScript，了解其类型系统、阅读过 Redux 源码',
      },
      {
        desc: '阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库',
      },
      {
        desc: '熟悉 Webpack，了解其原理、阅读过 Webpack 源码',
      },
      {
        desc: '熟悉 Git，了解其原理、阅读过 Git 源码',
      },
      {
        desc: '熟悉 Linux，了解其原理、阅读过 Linux 源码',
      },
      {
        desc: '熟悉 MySQL，了解其原理、阅读过 MySQL 源码',
      },
    ],
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
  return {};
}

export const { setToolBarList, addResume, removeResume, updateResume } =
  resumeSlice.actions;

export default resumeSlice.reducer;
