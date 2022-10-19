import { FC } from 'react';
import './ReScrollBox.module.less';
import cName from 'classnames';

export interface IScrollBoxProps {
  /**
   * @description 子组件
   */
  children: React.ReactNode;
  /**
   * @description 最大高度
   */
  maxHeight?: number;
  /**
   * @description 根div样式
   */
  style?: React.CSSProperties;
  /**
   * @description 内部div样式
   */
  innerStyle?: React.CSSProperties;
  /**
   * @description 回调得到滚动的top
   */
  onScrollTop?: (top: number) => void;
  /**
   * @description className
   */
  className?: string;
}

const ReScrollBox: FC<IScrollBoxProps> = ({
  children,
  maxHeight = 200,
  style = {},
  innerStyle = {},
  onScrollTop,
  className,
}) => {
  function onScroll(e: any) {
    const _event = e.target || e.currentTarget;
    onScrollTop && onScrollTop(_event.scrollTop);
  }
  let _style = { ...style };
  console.log(style);

  if (maxHeight) {
    _style = { ..._style, maxHeight: `${maxHeight}px` };
  }
  return (
    <div className={cName('scroll-box-outer', className)}>
      <div
        className={cName('scroll-box-hidden')}
        onScroll={onScroll}
        style={{ ..._style }}
      >
        <div className="scroll-box-inter" style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReScrollBox;
