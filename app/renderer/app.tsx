import { FC } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { GetRoute } from './router/index';
import '@src/styles/global.less';
import '@src/styles/reset.less';
import '@src/components/global/global.less';
import { Provider } from 'react-redux';
import { store } from './store';
import ThemeContextProvider from './context/themeContext';
const App: FC = () => {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <HashRouter>
          <GetRoute />
        </HashRouter>
      </Provider>
    </ThemeContextProvider>
  );
};

export default App;
