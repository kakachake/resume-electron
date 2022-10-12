import { Schema } from 'json-schema';

export const certificateSchema: Schema = {
  type: 'object',
  properties: {
    list: {
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: '证书名称',
            required: true,
          },
        },
      },
    },
  },
};
