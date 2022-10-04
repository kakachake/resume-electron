import { FC } from 'react';
import { getAppPath } from '../../utils/appPath';
import fileAction from '../../utils/file';

const Resume: FC = () => {
  getAppPath().then((rootPath) => {
    fileAction.read(rootPath + 'app/renderer/pages/resume/Resume.tsx').then((res) => {
      console.log(res);
    });
  });
  return <div>这是简历模块</div>;
};
export default Resume;
