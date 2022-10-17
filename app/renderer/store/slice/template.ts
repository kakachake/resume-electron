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
  templateList: [
    {
      name: 'template1',
      url: 'http://192.168.0.4:3030/bundle.js',
      cover: 'http://192.168.0.4:3030/preview.jpg',
      previewJson: 'http://192.168.0.4:3030/preview.json',
      id: '1',
    },
    {
      name: 'template1',
      url: 'http://192.168.0.4:3030/bundle.js',
      cover: 'http://192.168.0.4:3030/preview.jpg',
      previewJson: 'http://192.168.0.4:3030/preview.json',
      id: '2',
    },
    {
      name: 'template1',
      url: 'http://192.168.0.4:3030/bundle.js',
      cover: 'http://192.168.0.4:3030/preview.jpg',
      previewJson: 'http://192.168.0.4:3030/preview.json',
      id: '3',
    },
  ],
  selectedTemplate: {
    name: 'template1',
    url: 'http://192.168.0.4:3030/bundle.js',
    cover: 'http://192.168.0.4:3030/preview.jpg',
    previewJson: 'http://192.168.0.4:3030/preview.json',
    id: '2',
  },
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplateList: (state, action) => {
      state.templateList = action.payload;
    },
  },
});

export const { setTemplateList } = templateSlice.actions;

export default templateSlice.reducer;
