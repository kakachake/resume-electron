import Setting from './Setting';
import { store } from '@src/store/index';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Setting />
    </Provider>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
