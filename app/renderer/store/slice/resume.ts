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
    certificate: ['全国英语四级证书', '全国计算机二级证书'],
    contact: {
      phone: '15615538215',
      email: 'theeasylife@foxmail.com',
      github: 'https://github.com/kakachake',
      juejin: 'https://juejin.cn/user/1732486057168654',
    },
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
      if (!(state.resume as any)[key]) {
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
