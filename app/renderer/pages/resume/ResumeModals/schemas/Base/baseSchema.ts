import { Schema } from 'json-schema';

export const baseSchema: Schema = {
  type: 'object',
  properties: {
    group1: {
      type: 'object',
      // title: 'Group 1',
      properties: {
        avatar: {
          title: '头像',
          type: 'string',
          format: 'image',
          required: true,
        },
      },
    },
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

    area: {
      title: '地区',
      type: 'string',
    },
    school: {
      title: '学校',
      type: 'string',
    },
    major: {
      title: '专业',
      type: 'string',
    },
    degree: {
      title: '学位',
      type: 'string',
    },
    nativePlace: {
      title: '籍贯',
      type: 'string',
    },
    political: {
      title: '政治面貌',
      type: 'string',
    },
  },
};
