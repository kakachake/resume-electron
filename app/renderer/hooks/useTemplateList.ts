import { getTemplateList } from '../request/api/base';
import { useAppDispatch } from '../store';
import { setTemplateList } from '../store/slice/template';

export const useTemplateList = () => {
  const dispatch = useAppDispatch();
  getTemplateList().then((res) => {
    console.log(res);
    dispatch(setTemplateList(res.data));
  });
};
