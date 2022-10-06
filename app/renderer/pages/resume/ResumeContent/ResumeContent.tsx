import DynamicComponent from '@root/app/renderer/common/DynamicComponent';
import { FC } from 'react';

const ResumeContent: FC = () => {
  return (
    <div>
      ResumeContent
      <DynamicComponent title={'简历制作平台'} src="http://192.168.0.4:3030/bundle.js" />
    </div>
  );
};

export default ResumeContent;
