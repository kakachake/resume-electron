import { useEffect } from 'react';
import { IntactResume, SliderItem } from '../common/types/resume';
import { RESUME_TOOLBAR_LIST } from '../constants/resume';
import { useAppDispatch, useAppSelector } from '../store';

import { setToolBarList, addResume, removeResume } from '../store/slice/resume';
export default () => {
  const { toolbarList, resume } = useAppSelector((state) => state.resume);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let _addToolbarList: SliderItem[] = [];
      let _unAddToolbarList: SliderItem[] = [];
      RESUME_TOOLBAR_LIST.forEach((s: SliderItem) => {
        if (s.require) {
          _addToolbarList.push(s);
          dispatch(addResume(s.key as keyof IntactResume));
        }
        if (!s.require) _unAddToolbarList.push(s);
      });
      dispatch(setToolBarList({ isAdd: _addToolbarList, isNotAdd: _unAddToolbarList }));
    }
  }, []);

  const onAdd = (toolbarItem: SliderItem) => {
    let _addToolbarList: SliderItem[] = [...toolbarList.isAdd];
    let _unAddToolbarList: SliderItem[] = [...toolbarList.isNotAdd];
    _addToolbarList.push(toolbarItem);
    _unAddToolbarList = _unAddToolbarList.filter((s) => s.key !== toolbarItem.key);
    const _toolbarList = { isAdd: _addToolbarList, isNotAdd: _unAddToolbarList };
    dispatch(setToolBarList(_toolbarList));
    dispatch(addResume(toolbarItem.key as keyof IntactResume));
    return _toolbarList;
  };

  const onRemove = (toolbarItem: SliderItem) => {
    let _addToolbarList: SliderItem[] = [...toolbarList.isAdd];
    let _unAddToolbarList: SliderItem[] = [...toolbarList.isNotAdd];
    _unAddToolbarList.push(toolbarItem);
    _addToolbarList = _addToolbarList.filter((s) => s.key !== toolbarItem.key);
    const _toolbarList = { isAdd: _addToolbarList, isNotAdd: _unAddToolbarList };
    dispatch(setToolBarList(_toolbarList));
    dispatch(removeResume(toolbarItem.key as keyof IntactResume));
    return _toolbarList;
  };

  return [toolbarList.isAdd, toolbarList.isNotAdd, onAdd, onRemove] as const;
};
