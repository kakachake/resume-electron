import { Template } from '../store/slice/template';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RESUME_TOOLBAR_LIST, RESUME_TOOLBAR_MAPS } from '../constants/resume';

type ResumeToolbarItem = keyof typeof RESUME_TOOLBAR_MAPS;

export const useTemplatePreview = (template: Template | null) => {
  const [resume, setResume] = useState<any>(null);
  const [resumeToolbarList, setResumeToolbarList] = useState<ResumeToolbarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { previewJson } = template || {};

  useEffect(() => {
    if (!previewJson) return;
    setLoading(true);
    axios
      .get(previewJson)
      .then((res) => {
        setResume(res.data);
        const _resumeToolbarKeys: string[] = [];
        Object.keys(res.data).forEach((key) => {
          _resumeToolbarKeys.push(key);
        });
        setResumeToolbarList(_resumeToolbarKeys as ResumeToolbarItem[]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [template]);
  return [template?.url, resume, resumeToolbarList, loading] as const;
};
