import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { ROUTER, ROUTER_ENTRY } from '@root/app/renderer/constants/router';
import { useAppSelector } from '@root/app/renderer/store';
import { compilePath } from '@root/app/renderer/utils/router';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.less';

const Footer: FC = () => {
  const navigate = useNavigate();
  const { selectedTemplate } = useAppSelector((state) => state.template);
  const onMadeResume = () => {
    console.log('跳转前往制作页面');
    if (selectedTemplate) {
      navigate(
        compilePath(ROUTER.resume, {
          id: selectedTemplate?.id,
        })
      );
    }
  };
  return (
    <div className={styles.footer}>
      {selectedTemplate ? (
        <ReButton size="middle" className={styles.use_btn} onClick={onMadeResume}>
          以此模板前往制作简历
        </ReButton>
      ) : null}
    </div>
  );
};

export default Footer;
