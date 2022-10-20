import { FC, useEffect } from 'react';
import './styles/iconfont/iconfont.css';
import { HashRouter } from 'react-router-dom';
import { GetRoute } from './router/index';
import '@src/styles/global.less';
import '@src/styles/reset.less';
import '@src/components/global/global.less';
import { Provider } from 'react-redux';
import { store } from './store';
import ThemeContextProvider from './context/themeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

const App: FC = () => {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <ThemeToggle
          style={{
            position: 'fixed',
            right: '20px',
            top: '15px',
          }}
        />
        <HashRouter>
          <GetRoute />
        </HashRouter>
      </Provider>
    </ThemeContextProvider>
  );
};

export default App;
