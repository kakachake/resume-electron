import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { FC } from 'react';
import styles from './Footer.module.less';

const Footer: FC = () => {
  const onMadeResume = () => {
    console.log('跳转前往制作页面');
  };
  return (
    <div className={styles.footer}>
      <ReButton size="middle" className={styles.use_btn} onClick={onMadeResume}>
        以此模板前往制作简历
      </ReButton>
    </div>
  );
};

export default Footer;
