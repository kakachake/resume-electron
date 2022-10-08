import DynamicComponent from '@root/app/renderer/common/DynamicComponent';
import ReScrollBox from '@root/app/renderer/components/ReScrollBox/ReScrollBox';
import useToolBarList from '@root/app/renderer/hooks/useToolBarList';
import { useAppSelector } from '@root/app/renderer/store';
import { FC, useEffect, useState } from 'react';
import styles from './ResumeContent.module.less';

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
  const { resume } = useAppSelector((state) => state.resume);
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
        src="http://192.168.0.4:3030/bundle.js"
      />
    </ReScrollBox>
  );
};

export default ResumeContent;
