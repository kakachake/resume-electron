import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { ROUTER } from '@root/app/renderer/constants/router';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResumeAction.module.less';

const ResumeAction: FC = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTER.root);
  const onExport = () => {};
  return (
    <div className={styles.actions}>
      <div className={styles.back} onClick={onBack}>
        返回
      </div>
      <ReButton size="middle" className={styles['export-btn']} onClick={onExport}>
        导出PDF
      </ReButton>
    </div>
  );
};

export default ResumeAction;
