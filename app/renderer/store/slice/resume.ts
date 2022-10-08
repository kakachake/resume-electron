import { createSlice } from '@reduxjs/toolkit';
import { IntactResume, SliderItem } from '../../common/types/resume';

export interface ResumeState {
  toolbarList: {
    isAdd: SliderItem[];
    isNotAdd: SliderItem[];
  };
  resume: Partial<IntactResume>;
}

const initialState: ResumeState = {
  toolbarList: {
    isAdd: [],
    isNotAdd: [],
  },
  resume: {},
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setToolBarList: (state, action) => {
      state.toolbarList = action.payload;
    },
    addResume: (
      state,
      action: {
        payload: keyof IntactResume;
      }
    ) => {
      (state.resume as any)[action.payload] = createResumeItem(action.payload);
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

export const { setToolBarList, addResume, removeResume } = resumeSlice.actions;

export default resumeSlice.reducer;
