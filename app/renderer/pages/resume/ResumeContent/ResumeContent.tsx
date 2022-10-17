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

const ResumeContent: FC = () => {
  useMemo(() => {
    console.log('ResumeContent', 'render');
  }, []);

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
        src="http://192.168.0.4:3030/bundle.js"
      />
    </ReScrollBox>
  );
};

export default memo(ResumeContent);
