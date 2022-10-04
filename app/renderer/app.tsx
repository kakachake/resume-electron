import { FC } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { GetRoute } from './router/index';
import '@src/styles/global.less';
import '@src/styles/reset.less';
import { Provider } from 'react-redux';
import { store } from './store';
const App: FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <GetRoute />
      </HashRouter>
    </Provider>
  );
};

export default App;
