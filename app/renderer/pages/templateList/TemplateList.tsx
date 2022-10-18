import { FC, useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Navigation from './navigation/Navigation';
import styles from './TemplateList.module.less';
import TemplatePreview from './templatePreview/TemplatePreview';
import cName from 'classnames';

const TemplateList: FC = () => {
  const [hide, setHide] = useState(false);
  const onHideClick = () => {
    setHide(!hide);
  };
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div
          className={cName(styles.navigation, {
            [styles.hide]: hide,
          })}
        >
          <Navigation />
          <div className={styles.rectMenu} onClick={onHideClick}>
            <div
              className={cName(styles['rect-icon'], {
                [styles['rect-icon-hidden']]: hide,
              })}
            ></div>
          </div>
        </div>
        <div
          className={cName(styles.resumeContent, {
            [styles.hide]: hide,
          })}
        >
          <TemplatePreview />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TemplateList;