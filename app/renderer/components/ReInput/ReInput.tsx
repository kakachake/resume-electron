import React, {
  FC,
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import cname from 'classnames';
import styles from './ReInput.module.less';

export interface ReInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * @description 自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * @description 类型
   */
  type?: 'text' | 'password' | 'number' | 'email' | 'url' | 'tel';
  /**
   * @description 控件类型
   */
  controlType?: 'input' | 'textarea';
  /**
   * @description 输入框大小
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @description 设置前置标签
   */
  addonBefore?: React.ReactNode;
  /**
   * @description 设置后置标签
   */
  addonAfter?: React.ReactNode;
  /**
   * @description 允许计数
   */
  allowCount?: boolean;
  /**
   * @description 可以点击清除图标删除内容
   */
  allowClear?: boolean;
  /**
   * @description textarea行数，默认3
   */
  rows?: number;
  /**
   * @description 动态样式
   */
  style?: React.CSSProperties;
  /**
   * @description 输入框内容
   */
  value?: string | number | undefined;
  /**
   * @description 输入框占位符
   */
  placeholder?: string;
  /**
   * @description 输入框id
   */
  id?: string;
  /**
   * @description 最大长度
   */
  maxLength?: number;
  /**
   * @description 是否背景透明
   */
  bgTransparent?: boolean;
  /**
   * @description 回调函数
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ReInput: FC<ReInputProps> = ({
  autoFocus = false,
  type = 'text',
  controlType = 'input',
  size = 'middle',
  disabled = false,
  addonBefore,
  addonAfter,
  allowCount = false,
  allowClear = true,
  rows = 3,
  style,
  value,
  placeholder,
  id,
  maxLength,
  bgTransparent = false,
  onChange,
  ...args
}) => {
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value as string);

  useLayoutEffect(() => {
    setInputValue(value as string);
  }, [value]);

  const onInput = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLInputElement;
    console.log(e.target);
    console.log(value);

    if (maxLength && value.length > maxLength) {
      onChange?.({ target: { value: value.slice(0, maxLength) } } as any);
    }
    onChange?.({ target: { value } } as any);
  };

  const renderClear = () => {
    return (
      !!allowClear &&
      !disabled &&
      !!inputValue && (
        <span
          className={styles['re-input-clear']}
          onClick={() => {
            onChange?.({ target: { value: '' } } as any);
          }}
        ></span>
      )
    );
  };

  const renderInput = () => {
    return (
      <div
        className={cname(styles['re-input-wrap'], styles['re-input-wrap-default'], {
          [styles['re-input-wrap-focus']]: focus,
        })}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <input
          className={cname(styles['re-input'], styles['re-input-default'])}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          type="text"
          {...args}
          value={inputValue}
          onChange={onInput}
        />
        {renderClear()}
      </div>
    );
  };
  const renderTextArea = () => {
    return (
      <textarea
        className={cname(styles['re-textarea-textarea'])}
        id={id}
        disabled={disabled}
        rows={rows}
        autoFocus={autoFocus}
        value={inputValue}
        onChange={onInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
      />
    );
  };
  function renderBefore() {
    return (
      !!addonBefore && <div className={styles['re-input-prefix']}>{addonBefore}</div>
    );
  }
  function renderAfter() {
    return !!addonAfter && <div className={styles['re-input-suffix']}>{addonAfter}</div>;
  }

  return (
    <div
      style={style}
      className={cname((styles as any)[`re-${controlType}-container`], {
        [(styles as any)[`re-${controlType}-wrap-focus`]]: focus,
      })}
    >
      {renderBefore()}
      {controlType === 'input' ? renderInput() : renderTextArea()}
      {renderAfter()}
    </div>
  );
};

export default ReInput;
