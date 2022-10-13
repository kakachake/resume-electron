import { Schema } from 'json-schema';

export const certificateSchema: Schema = {
  type: 'object',
  flex: false,
  properties: {
    list: {
      type: 'array',
      widget: 'simpleList',
      default: [],
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: '证书名称',
            required: true,
            width: '100%',
          },
          date: {
            type: 'string',
            title: '获得时间',
            required: true,
            format: 'dateTime',
            width: '100%',
          },
        },
      },
    },
  },
};

export const certificateAdapter = (formValue: any) => {
  return formValue.list;
};
