import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import styles from './ReTheme.module.less';
import cName from 'classnames';
import { setCurrentTheme } from '../../store/slice/theme';
import { useChangeCurrentTheme } from '../../hooks/useThemeActionHooks';

export interface IReThemeProps {}

const ReTheme: FC = () => {
  const { themeList, currentTheme } = useAppSelector((state) => state.theme);
  console.log(themeList);
  const changeCurrentTheme = useChangeCurrentTheme();
  const setTheme = (theme: TSTheme.Item) => {
    changeCurrentTheme(theme);
  };

  return (
    <div className={styles.box}>
      {themeList &&
        themeList.length > 0 &&
        [...themeList].map((theme: TSTheme.Item, index: number) => {
          return (
            <span
              key={index}
              style={{
                backgroundColor: theme.backgroundColor,
              }}
              className={cName({
                [styles.active]: theme.id === currentTheme?.id,
              })}
              onClick={() => setTheme(theme)}
            ></span>
          );
        })}
    </div>
  );
};

export default ReTheme;
