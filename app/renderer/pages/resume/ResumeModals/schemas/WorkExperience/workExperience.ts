import { Schema } from 'json-schema';

export const workExperienceSchema: Schema = {
  type: 'object',
  width: '700px',
  properties: {
    list: {
      type: 'array',
      title: '项目经验',
      widget: 'tabList',
      items: {
        type: 'object',
        flex: false,
        properties: {
          projectName: {
            type: 'string',
            title: '公司名称',
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

export const workExperienceAdapter = {
  form2data: (data: any) => {
    return data.list;
  },
  data2form: (data: any) => {
    return {
      list: data,
    };
  },
};
