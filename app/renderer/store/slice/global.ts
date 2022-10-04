import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface GlobalState {
  appName: string;
}

const initialState: GlobalState = {
  appName: '简历制作平台',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
  },
});

export const { setAppName } = globalSlice.actions;

export default globalSlice.reducer;
