import { Schema } from 'json-schema';

export const contactSchema: Schema = {
  type: 'object',
  properties: {
    phone: {
      title: '电话号码',
      type: 'string',
    },
    email: {
      title: '邮箱',
      type: 'string',
    },
    github: {
      title: 'github',
      type: 'string',
    },
    juejin: {
      title: '掘金',
      type: 'string',
    },
  },
};
