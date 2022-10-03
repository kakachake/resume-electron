import { FC } from 'react';

import style from './title.module.less';

export interface ITitleProps {
  text: string;
  styles?: React.CSSProperties;
}

const Title: FC<ITitleProps> = ({ text, styles }) => {
  return (
    <div>
      <div style={styles} className={style.box}>
        {text}
      </div>
    </div>
  );
};

export default Title;
