import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { ReDialog } from '@root/app/renderer/components/ReModal/ReModal';
import { ROUTER } from '@root/app/renderer/constants/router';
import {
  readGlobalConfigFile,
  updateGlobalConfigFile,
} from '@root/app/renderer/hooks/useReadGlobalConfigFile';
import { useAppSelector } from '@root/app/renderer/store';
import { createUID } from '@root/app/renderer/utils';
import { getUserDataPath } from '@root/app/renderer/utils/appPath';
import fileAction from '@root/app/renderer/utils/file';
import { intToDateString } from '@root/app/renderer/utils/time';
import path from 'path';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResumeAction.module.less';

const ResumeAction: FC = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTER.root);
  const resume = useAppSelector((state) => state.resume.resume);
  const { base, job } = resume;
  const exportPdf = () => {
    import('@root/app/renderer/utils/htmlToPdf').then((module) => {
      const { toPrintPdf } = module;
      toPrintPdf(`${base?.name} + ${base?.school}`);
      readGlobalConfigFile().then((config: any) => {
        if (config.resumeSavePath) {
          saveResumeJson(config.resumeSavePath);
        } else {
          getUserDataPath().then((appPath) => {
            updateGlobalConfigFile('resumeSavePath', path.join(appPath, 'resumeCache'));
            saveResumeJson(appPath);
          });
        }
      });
    });
  };

  const saveResumeJson = (resumeSavePath: string) => {
    const date = intToDateString(new Date().valueOf(), '_');
    const prefix = `${date}_${base?.name}_${base?.school}_${
      job?.job || ''
    }_${createUID()}.json`;
    if (resumeSavePath && resumeSavePath.search('resumeCache') > -1) {
      fileAction.write(`${resumeSavePath}/${prefix}`, JSON.stringify(resume));
    } else {
      fileAction.mkdirDir(`${resumeSavePath}/resumeCache`).then((path) => {
        console.log(resumeSavePath);
        console.log(path);

        if (path) {
          fileAction.write(`${path}/${prefix}`, JSON.stringify(resume));
        } else {
          fileAction.write(
            `${resumeSavePath}/resumeCache/${prefix}`,
            JSON.stringify(resume)
          );
        }
      });
    }
  };
  const onExport = () => {
    ReDialog.confirm({
      title: '???????????????????????????',
      width: 700,
      children: <div>????????????????????????????????????????????????????????????</div>,
      config: {
        submitBtn: {
          show: true,
          text: '??????',
          callback: () => {
            console.log('??????');
            exportPdf();
          },
        },
        cancelBtn: {
          show: true,
          text: '??????',
          callback: () => {
            console.log('??????');
          },
        },
      },
    });
  };
  return (
    <div className={styles.actions}>
      <div className={styles.back} onClick={onBack}>
        ??????
      </div>
      <ReButton size="middle" className={styles['export-btn']} onClick={onExport}>
        ??????PDF
      </ReButton>
    </div>
  );
};

export default ResumeAction;
