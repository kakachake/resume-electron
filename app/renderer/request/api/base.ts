import request from '..';

export const getTemplateList = () => {
  return request.get('http://101.43.155.53/resume/tempList.json');
};
