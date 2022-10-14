export const evaluationSchema = {
  type: 'object',
  properties: {
    evaluation: {
      format: 'textarea',
      type: 'string',
    },
  },
};

export const evaluationAdapter = {
  form2data: (form: any) => {
    return form.evaluation;
  },
  data2form: (data = '') => {
    console.log('data', data);

    return {
      evaluation: data,
    };
  },
};
