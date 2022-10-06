import { FC } from 'react';
import './ReScrollBox.module.less';

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
}

const ReScrollBox: FC<IScrollBoxProps> = ({
  children,
  maxHeight = 200,
  style = {},
  innerStyle = {},
  onScrollTop,
}) => {
  function onScroll(e: any) {
    const _event = e.target || e.currentTarget;
    onScrollTop && onScrollTop(_event.scrollTop);
  }
  let _style = { ...style };
  console.log('maxHeight', maxHeight);

  if (maxHeight) {
    _style = { ..._style, maxHeight: `${maxHeight}px` };
  }
  return (
    <div className="scroll-box-outer" style={_style} onScroll={onScroll}>
      <div className="scroll-box-hidden" style={{ maxHeight: `${maxHeight}px` }}>
        <div className="scroll-box-inter" style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReScrollBox;
