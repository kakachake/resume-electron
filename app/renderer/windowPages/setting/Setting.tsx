import { ipcRenderer } from 'electron';
import { FC } from 'react';
import styles from './index.module.less';
import '@src/components/global/global.less';
import { Toast } from '@douyinfe/semi-ui';
import { useResumeSavePath } from '../../hooks/useReadGlobalConfigFile';

const Setting: FC = () => {
  const [resumeSavePath, setResumeSavePath] = useResumeSavePath();
  const onChangePath = () => {
    ipcRenderer.send('open-save-resume-path', '');
    ipcRenderer.on('reply-save-resume-path', (event, arg: any[]) => {
      if (arg) {
        if (arg.length > 0) {
          setResumeSavePath(arg[0]);
        } else {
          Toast.error("Can't get the path");
        }
      }
      ipcRenderer.removeAllListeners('reply-save-resume-path');
    });
  };
  return (
    <div className={styles.container}>
      <p className={styles.label}>修改简历数据存储路径</p>
      <div className={styles.input}>
        <div className={styles.value}>{resumeSavePath || '当前存储路径为：'}</div>
        <div className={styles['update-btn']} onClick={onChangePath}>
          更改路径
        </div>
      </div>
    </div>
  );
};

export default Setting;
