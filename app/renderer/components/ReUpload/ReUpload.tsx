import { FC, useRef } from 'react';
import FileEvent from './fileEvent';
import cName from 'classnames';
import './ReUpload.less';
import ReButton from '../ReButton/ReButton';

export interface IReUploadProps {
  /**
   * @description 样式
   */
  style?: React.CSSProperties;
  /**
   * @description 接受上传的文件类型
   */
  accept?: string;
  /**
   * @description 是否多选
   */
  multiple?: boolean;
  /**
   * @description 是否可见
   */
  visible?: boolean;
  /**
   * @description 点击回调
   */
  onClick?: () => void;
  /**
   * @description 文件状态发生变化时调用
   */
  onChange?: (fileList: TSUpload.File[]) => void;
  /**
   * @description 替换显示的内容
   */
  children?: React.ReactNode;
}

const ReUpload: FC = (props: IReUploadProps) => {
  const { style, accept, multiple, visible = true, onClick, onChange, children } = props;
  const inputSelectorRef = useRef<HTMLInputElement>(null);

  function _onChange(e: any) {
    const fileList: any = e?.target?.files || [];
    if (e.target.value === '') {
      return;
    }
    let instance: TSUpload.File[] = [];
    // fileList 属于 [object FileList] 类型
    for (let file of fileList) {
      instance.push(new FileEvent(file));
    }
    console.log(instance);

    onChange && onChange(instance);
  }
  return (
    <div>
      {children ? (
        <div
          className={cName('re-upload', {
            're-upload-visible': visible,
          })}
          style={style}
          onClick={() => {
            inputSelectorRef.current?.click();
            onClick && onClick();
          }}
        >
          {children}
        </div>
      ) : (
        <ReButton
          className={cName('re-upload', {
            're-upload-visible': visible,
          })}
          style={style}
          onClick={() => {
            inputSelectorRef.current?.click();
            onClick && onClick();
          }}
        >
          上传文件
        </ReButton>
      )}
      <input
        type="file"
        style={style}
        accept={accept}
        multiple={multiple}
        ref={inputSelectorRef}
        onClick={onClick}
        onChange={_onChange}
        className={cName('re_input_selector', 're_input_selector_hidden')}
      />
    </div>
  );
};

export default ReUpload;
