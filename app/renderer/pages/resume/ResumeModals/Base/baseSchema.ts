import { Schema } from 'json-schema';

export const baseSchema: Schema = {
  type: 'object',
  properties: {
    name: {
      title: '姓名',
      type: 'string',
      required: true,
    },
    date: {
      title: '出生日期',
      type: 'string',
      format: 'dateTime',
      required: true,
    },
    image: {
      title: '头像',
      type: 'string',
      format: 'image',
      required: true,
    },
    background: {
      title: '背景',
      type: 'string',
      format: 'image',
    },
  },
};
