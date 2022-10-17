import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.less';

const Header: FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate('/');
  return (
    <div className={styles.header}>
      <div className={styles.back} onClick={goBack}>
        返回
      </div>
      <p className={styles.title}>简历模版仓库</p>
    </div>
  );
};

export default Header;
