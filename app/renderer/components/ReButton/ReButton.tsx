import { FC } from 'react';
import cname from 'classnames';
import styles from './ReButton.module.less';
export interface IButtonProps {
  /**
   * @description 按钮大小
   */
  size?: 'middle' | 'large' | 'small';
  /**
   * @description 按钮类型
   */
  type?: 'primary' | 'warning' | 'danger' | 'default';
  /**
   * @description 按钮宽度
   */
  width?: number;
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 子组件
   */
  children?: React.ReactNode;
  /**
   * @description 禁止点击
   */
  disabled?: boolean;
  /**
   * @description 点击事件
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /**
   * @description 样式名
   */
  className?: string;
  /**
   * @description 是否含有边框
   */
  border?: boolean;
}

const ReButton: FC<IButtonProps> = ({
  size = 'middle',
  width,
  type = 'primary',
  style,
  children,
  disabled,
  onClick,
  className,
  border = false,
}) => {
  return (
    <div
      style={{
        ...style,
        width: width ? width + 'px' : 'auto',
      }}
      className={cname(
        className,
        styles['re-button'],
        styles['re-button-light'],
        (styles as any)['re-button-' + size],
        {
          [styles['re-button-border']]: border,
          [styles['re-button-disabled']]: disabled,
        },
        (styles as any)['re-button-' + type]
      )}
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      {children}
    </div>
  );
};

export default ReButton;
