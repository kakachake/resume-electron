import ReScrollBox from '@root/app/renderer/components/ReScrollBox/ReScrollBox';
import useToolBarList from '@root/app/renderer/hooks/useToolBarList';
import { FC, useEffect, useState } from 'react';
import styles from './ResumeToolbar.module.less';
import ToolBar from './ToolBar/ToolBar';

const ResumeToolbar: FC = () => {
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  useEffect(() => {
    const handleResize = () => {
      setHeight(document.documentElement.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [addList, notAddList, onAdd, onRemove] = useToolBarList();

  return (
    <div className={styles.slider}>
      <ReScrollBox maxHeight={height - 180}>
        <div>
          <div className={styles.title}>已添加模块</div>
          <ToolBar list={addList} edit={true} onRemoveClick={onRemove} />
        </div>
        <div>
          <div className={styles.title}>未添加模块</div>
          <ToolBar list={notAddList} onAddClick={onAdd} />
        </div>
      </ReScrollBox>
    </div>
  );
};

export default ResumeToolbar;
