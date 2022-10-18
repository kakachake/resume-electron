import { createSlice } from '@reduxjs/toolkit';

export interface ThemeStore {
  themeList: TSTheme.Item[];
  currentTheme: TSTheme.Item | null;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    themeList: [],
    currentTheme: null,
  } as ThemeStore,
  reducers: {
    setThemeList: (state, action) => {
      state.themeList = action.payload;
    },
    setCurrentTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setThemeList, setCurrentTheme } = themeSlice.actions;

export default themeSlice.reducer;
