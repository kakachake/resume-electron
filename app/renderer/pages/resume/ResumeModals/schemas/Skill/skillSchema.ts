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

export const skillAdapter = {
  form2data: (form: any) => {
    return form.list;
  },
  data2form: (data: any) => {
    return data;
  },
};
