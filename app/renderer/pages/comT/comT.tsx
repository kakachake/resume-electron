import { FC, useContext } from 'react';
import ReButton from '../../components/ReButton/ReButton';
import { ThemeContext, themeType } from '../../context/themeContext';

const ComT: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toogleTheme = () => {
    console.log(theme);

    setTheme(theme === themeType.dark ? themeType.light : themeType.dark);
  };
  return (
    <div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <ReButton onClick={() => toogleTheme()} type="primary" size="middle">
          切换主题
        </ReButton>
      </div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <h1>button</h1>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <ReButton type="default" size="large">
            按钮
          </ReButton>
          <ReButton type="primary" size="small">
            按钮
          </ReButton>
          <ReButton type="warning">按钮</ReButton>
          <ReButton type="danger" size="middle">
            按钮
          </ReButton>
        </div>
      </div>
    </div>
  );
};

export default ComT;
