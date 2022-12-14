import { Schema } from 'json-schema';

export const projectExperienceSchema: Schema = {
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
            title: '项目名',
          },
          post: {
            type: 'string',
            title: '职位',
          },
          beginTime: {
            type: 'string',
            title: '开始时间',
            format: 'dateTime',
          },
          endTime: {
            type: 'string',
            title: '结束时间',
            format: 'dateTime',
          },
          // date: {
          //   title: '时间',
          //   format: 'dateTime',
          //   type: 'range',
          // },
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

export const projectExperienceAdapter = {
  form2data: (data: any) => {
    return data.list;
  },
  data2form: (data: any) => {
    return {
      list: data,
    };
  },
};
