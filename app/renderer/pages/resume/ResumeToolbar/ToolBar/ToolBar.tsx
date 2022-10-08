import { SliderItem } from '@src/common/types/resume';
import { FC } from 'react';
import styles from './ToolBar.module.less';
import cName from 'classnames';

interface IToolBarProps {
  list: SliderItem[];
  edit?: boolean;
  onAddClick?: (item: SliderItem) => void;
  onEditClick?: (item: SliderItem) => void;
  onRemoveClick?: (item: SliderItem) => void;
}

const ToolBar: FC<IToolBarProps> = ({
  list,
  edit = false,
  onAddClick,
  onEditClick,
  onRemoveClick,
}) => {
  return (
    <div>
      {list.map((item) => {
        return (
          <div className={styles.box} key={item.key}>
            <i className={cName(styles.icon, 'iconfont icon-gongzuojingyan')}></i>
            <div className={cName(styles.text)}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.summary}>{item.summary}</div>
            </div>
            {item.require && <div className={styles.tips}>必选项</div>}
            {edit && (
              <div className={styles.action}>
                <i
                  onClick={() => {
                    onEditClick && onEditClick(item);
                  }}
                  className="iconfont icon-bianji_o"
                ></i>
                {!item.require && (
                  <i
                    onClick={() => {
                      onRemoveClick && onRemoveClick(item);
                    }}
                    className="iconfont icon-shanchu"
                  ></i>
                )}
              </div>
            )}
            {!edit && (
              <div className={styles.action}>
                <i
                  onClick={() => {
                    onAddClick && onAddClick(item);
                  }}
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
