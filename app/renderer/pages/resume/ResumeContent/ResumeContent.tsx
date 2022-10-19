import DynamicComponent from '@root/app/renderer/common/DynamicComponent';
import messager, {
  MESSAGE_EVENT_NAME_MAPS,
} from '@root/app/renderer/common/messager/messager';
import ReScrollBox from '@root/app/renderer/components/ReScrollBox/ReScrollBox';
import { useAppSelector } from '@root/app/renderer/store';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import styles from './ResumeContent.module.less';
import { ResumeModals } from '../ResumeModals';
import { IntactResume } from '@root/app/renderer/common/types/resume';
import { useHeight } from '@root/app/renderer/hooks/useHeight';
import { useParams } from 'react-router-dom';
import { Template } from '@root/app/renderer/store/slice/template';

const ResumeContent: FC = () => {
  const [template, setTemplate] = useState<Template>();
  const { selectedTemplate, templateList } = useAppSelector((state) => state.template);
  const { id } = useParams();
  useEffect(() => {
    let _template = selectedTemplate;
    if (id) {
      const template = templateList.find((item) => item.id === id);
      if (template) {
        _template = template;
      }
    }
    if (_template) {
      setTemplate(_template);
    }
  }, [id, selectedTemplate]);

  const [height, setHeight] = useHeight(100);

  const { resume, resumeToolbarKeys } = useAppSelector((state) => state.resume);
  const onReceive = (data: { form_name: keyof IntactResume }) => {
    console.log('发布订阅，传参值为: ', data);
    import('../ResumeModals').then((modals) => {
      const { ResumeModals } = modals;
      ResumeModals.showModal({ type: data.form_name });
    });
  };
  messager.useOn(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
  return (
    <ReScrollBox
      className={styles['resume-content']}
      maxHeight={height}
      style={{
        borderRadius: '0.375rem',
      }}
    >
      <DynamicComponent
        title={'简历制作平台'}
        resume={resume}
        resumeToolbarKeys={resumeToolbarKeys}
        src={template?.url || ''}
      />
    </ReScrollBox>
  );
};

export default memo(ResumeContent);
