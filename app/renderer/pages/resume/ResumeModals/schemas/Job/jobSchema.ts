import { Schema } from 'json-schema';

export const jobSchema: Schema = {
  type: 'object',
  flex: false,
  properties: {
    job: {
      title: '意愿岗位',
      type: 'string',
      required: true,
    },
    city: {
      title: '意愿城市',
      type: 'string',
      required: true,
    },
  },
};
