import { SliderItem } from '@src/common/types/resume';
import { FC } from 'react';
import styles from './ToolBar.module.less';
import cName from 'classnames';
import { stopClick } from '@root/app/renderer/utils/stopClick';

interface IToolBarProps {
  list: SliderItem[];
  edit?: boolean;
  onItemClick?: (item: SliderItem) => void;
  onAddClick?: (item: SliderItem) => void;
  onEditClick?: (item: SliderItem) => void;
  onRemoveClick?: (item: SliderItem) => void;
}

const ToolBar: FC<IToolBarProps> = ({
  list,
  edit = false,
  onItemClick,
  onAddClick,
  onEditClick,
  onRemoveClick,
}) => {
  return (
    <div>
      {list.map((item) => {
        return (
          <div
            className={styles.box}
            key={item.key}
            onClick={() => onItemClick && onItemClick(item)}
          >
            <i className={cName(styles.icon, 'iconfont icon-gongzuojingyan')}></i>
            <div className={cName(styles.text)}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.summary}>{item.summary}</div>
            </div>
            {item.require && <div className={styles.tips}>必选项</div>}
            {edit && (
              <div className={styles.action}>
                <i
                  onClick={stopClick(() => onEditClick && onEditClick(item))}
                  className="iconfont icon-bianji_o"
                ></i>
                {!item.require && (
                  <i
                    onClick={stopClick(() => onRemoveClick && onRemoveClick(item))}
                    className="iconfont icon-shanchu"
                  ></i>
                )}
              </div>
            )}
            {!edit && (
              <div className={styles.action}>
                <i
                  onClick={stopClick(() => onAddClick && onAddClick(item))}
                  className="iconfont icon-tianjia"
                ></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ToolBar;
