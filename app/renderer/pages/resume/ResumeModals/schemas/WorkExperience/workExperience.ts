import { Schema } from 'json-schema';

export const workExperienceSchema: Schema = {
  type: 'object',
  width: '700px',
  properties: {
    list: {
      type: 'array',
      title: '工作经历',
      widget: 'tabList',
      items: {
        type: 'object',
        flex: false,
        properties: {
          department: {
            type: 'string',
            title: '公司名称',
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
