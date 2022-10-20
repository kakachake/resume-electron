import { createSlice } from '@reduxjs/toolkit';

export interface Template {
  name: string;
  cover: string;
  url: string;
  id: string;
  previewJson: string;
}

export interface TemplateState {
  templateList: Template[];
  selectedTemplate: Template | null;
}

const initialState: TemplateState = {
  templateList: [],
  selectedTemplate: null,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplateList: (state, action) => {
      state.templateList = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { setTemplateList, setSelectedTemplate } = templateSlice.actions;

export default templateSlice.reducer;
