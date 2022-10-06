import { FC } from 'react';
import { getAppPath } from '../../utils/appPath';
import fileAction from '../../utils/file';
import ResumeContent from './ResumeContent/ResumeContent';

const Resume: FC = () => {
  // getAppPath().then((rootPath) => {
  //   fileAction.read(rootPath + 'app/renderer/pages/resume/Resume.tsx').then((res) => {
  //     console.log(res);
  //   });
  // });
  return (
    <div>
      <ResumeContent />
    </div>
  );
};
export default Resume;
