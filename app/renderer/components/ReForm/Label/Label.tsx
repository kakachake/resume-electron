import { FC } from 'react';
import styles from './Label.module.less';

interface ILabelProps {
  label: string;
  labelWidth?: number;
  required?: boolean;
  children: React.ReactElement;
  height?: number;
}

const Label: FC<ILabelProps> = ({
  label,
  labelWidth,
  required = false,
  children,
  height,
}) => {
  return (
    <div
      className={styles.formLabel}
      style={{
        height: `${height}px`,
      }}
    >
      <div
        style={{
          width: `${labelWidth}px`,
        }}
      >
        {required ? <span className={styles.required}>*</span> : null}
        {label}
      </div>
      {children}
    </div>
  );
};

export default Label;
