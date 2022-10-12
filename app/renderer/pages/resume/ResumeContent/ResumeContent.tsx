import DynamicComponent from '@root/app/renderer/common/DynamicComponent';
import messager, {
  MESSAGE_EVENT_NAME_MAPS,
} from '@root/app/renderer/common/messager/messager';
import ReDialog from '@root/app/renderer/components/ReModal/ReDialog/ReDialog';
import ReScrollBox from '@root/app/renderer/components/ReScrollBox/ReScrollBox';
import useToolBarList from '@root/app/renderer/hooks/useToolBarList';
import { useAppSelector } from '@root/app/renderer/store';
import { FC, useEffect, useState } from 'react';
import styles from './ResumeContent.module.less';
import { ResumeModals } from '../ResumeModals';
import { IntactResume } from '@root/app/renderer/common/types/resume';

const ResumeContent: FC = () => {
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const HEADER_ACTION_HEIGHT = 100;
  useEffect(() => {
    const handleResize = () => {
      setHeight(document.documentElement.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { resume, resumeToolbarKeys } = useAppSelector((state) => state.resume);
  const onReceive = (data: { form_name: keyof IntactResume }) => {
    console.log('发布订阅，传参值为: ', data);
    ResumeModals.showModal({ type: data.form_name });
  };
  messager.useOn(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
  return (
    <ReScrollBox
      className={styles['resume-content']}
      maxHeight={height - HEADER_ACTION_HEIGHT}
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

export default ResumeContent;
