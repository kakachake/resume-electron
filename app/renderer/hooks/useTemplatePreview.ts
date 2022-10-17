import { Template } from '../store/slice/template';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RESUME_TOOLBAR_LIST, RESUME_TOOLBAR_MAPS } from '../constants/resume';

type ResumeToolbarItem = keyof typeof RESUME_TOOLBAR_MAPS;

export const useTemplatePreview = (template: Template | null) => {
  if (!template) return [null, null];
  const { url, previewJson } = template;
  const [resume, setResume] = useState<any>(null);
  const [resumeToolbarList, setResumeToolbarList] = useState<ResumeToolbarItem[]>([]);

  useEffect(() => {
    axios.get(previewJson).then((res) => {
      setResume(res.data);
      const _resumeToolbarKeys: string[] = [];
      Object.keys(res.data).forEach((key) => {
        _resumeToolbarKeys.push(key);
      });
      setResumeToolbarList(_resumeToolbarKeys as ResumeToolbarItem[]);
    });
  }, [template]);
  return [resume, resumeToolbarList] as const;
};
