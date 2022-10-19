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

  const [url, resume, resumeToolbarKeys, loading] = useTemplatePreview(selectedTemplate);

  return (
    <div className={styles['resume-content']}>
      <ReScrollBox
        maxHeight={height}
        style={{
          height: height + 'px',
          borderRadius: '0.375rem',
        }}
      >
        {!loading && selectedTemplate ? (
          <DynamicComponent
            title={'简历制作平台'}
            resume={resume}
            resumeToolbarKeys={resumeToolbarKeys}
            src={url!}
          />
        ) : (
          <div className={styles.selectInfo}>请先选择模板</div>
        )}
      </ReScrollBox>
    </div>
  );
};

export default TemplatePreview;
