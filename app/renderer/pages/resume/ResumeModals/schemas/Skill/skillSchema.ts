import { Schema } from 'json-schema';

export const skillSchema: Schema = {
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
          desc: {
            type: 'string',
            title: '技能名称',
            required: true,
            width: '100%',
            format: 'textarea',
          },
        },
      },
    },
  },
};

export const skillAdapter = (formValue: any) => {
  return formValue.list;
};
