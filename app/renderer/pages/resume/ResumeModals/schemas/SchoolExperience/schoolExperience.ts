import { Schema } from 'json-schema';

export const schoolExperienceSchema: Schema = {
  type: 'object',
  width: '700px',
  properties: {
    list: {
      type: 'array',
      title: '在校经历',
      widget: 'tabList',
      items: {
        type: 'object',
        flex: false,
        properties: {
          projectName: {
            type: 'string',
            title: '部门',
          },
          post: {
            type: 'string',
            title: '职位',
          },
          date: {
            title: '时间',
            format: 'dateTime',
            type: 'range',
          },
          content: {
            type: 'string',
            format: 'markdown',
            title: '主要工作',
          },
        },
      },
    },
  },
};

export const schoolExperienceAdapter = {
  form2data: (data: any) => {
    return data.list;
  },
  data2form: (data: any) => {
    return {
      list: data,
    };
  },
};
