import ReScrollBox from '@root/app/renderer/components/ReScrollBox/ReScrollBox';
import { useAppDispatch, useAppSelector } from '@root/app/renderer/store';
import { setSelectedTemplate, Template } from '@root/app/renderer/store/slice/template';
import { FC } from 'react';
import styles from './Navigation.module.less';
import UseIcon from '@assets/icon/use.png';
import ReButton from '@root/app/renderer/components/ReButton/ReButton';

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const selectTemplate = (template: Template) => {
    dispatch(setSelectedTemplate(template));
  };
  const HEADER_HEIGHT = 116;
  const height = document.documentElement.clientHeight;
  const { templateList, selectedTemplate } = useAppSelector((state) => state.template);
  return (
    <div className={styles.navigation}>
      <ReScrollBox maxHeight={height - HEADER_HEIGHT}>
        {templateList &&
          templateList.map((template: Template) => {
            return (
              <div className={styles.template} key={template.id}>
                <img src={template.cover} className={styles.cover} alt="模板图" />
                <div className={styles.mask}>
                  {template.id === selectedTemplate?.id ? (
                    <img className={styles.use} src={UseIcon} alt="选中" />
                  ) : (
                    <ReButton
                      size="middle"
                      className={styles['view-btn']}
                      onClick={() => {
                        selectTemplate(template);
                      }}
                    >
                      预览模板
                    </ReButton>
                  )}
                </div>
              </div>
            );
          })}
      </ReScrollBox>
    </div>
  );
};

export default Navigation;
