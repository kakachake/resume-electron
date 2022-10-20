import { FC, memo, useEffect, useLayoutEffect, useMemo } from 'react';

import ResumeContent from './ResumeContent/ResumeContent';
import ResumeAction from './ResumeAction/ResumeAction';
import ResumeToolbar from './ResumeToolbar/ResumeToolbar';
import styles from './Resume.module.less';

const Resume: FC = () => {
  console.log('render Resume');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ResumeAction />
      </div>
      <div className={styles.content}>
        <ResumeContent />
      </div>
      <div className={styles.toolbar}>
        <ResumeToolbar />
      </div>
    </div>
  );
};
export default memo(Resume);
