import DynamicComponent from '@root/app/renderer/common/DynamicComponent';
import ReScrollBox from '@root/app/renderer/components/ReScrollBox/ReScrollBox';
import { useHeight } from '@root/app/renderer/hooks/useHeight';
import { useTemplatePreview } from '@root/app/renderer/hooks/useTemplatePreview';
import { useAppSelector } from '@root/app/renderer/store';
import { FC } from 'react';
import styles from './TemplatePreview.module.less';

const TemplatePreview: FC = () => {
  const [height, setHeight] = useHeight(150);
  const { selectedTemplate } = useAppSelector((state) => state.template);

  const [resume, resumeToolbarKeys] = useTemplatePreview(selectedTemplate);
  if (!resume) {
    return null;
  }
  return (
    <div className={styles['resume-content']}>
      <ReScrollBox
        maxHeight={height}
        style={{
          borderRadius: '0.375rem',
        }}
      >
        <DynamicComponent
          title={'简历制作平台'}
          resume={resume}
          resumeToolbarKeys={resumeToolbarKeys}
          src="http://192.168.0.4:3030/bundle.js"
        />
      </ReScrollBox>
    </div>
  );
};

export default TemplatePreview;
function useTemplate(
  selectedTemplate: import('../../../store/slice/template').Template | null
): [any, any] {
  throw new Error('Function not implemented.');
}
