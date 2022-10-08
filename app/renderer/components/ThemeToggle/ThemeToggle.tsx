import { FC, useContext } from 'react';
import { ThemeContext, themeType } from '../../context/themeContext';
import styles from './ThemeToggle.module.less';
import cName from 'classnames';
const ThemeToggle: FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <i
      className={cName(styles['toggle-theme'], className)}
      style={style}
      onClick={() =>
        setTheme(theme === themeType.dark ? themeType.light : themeType.dark)
      }
    ></i>
  );
};
export default ThemeToggle;
