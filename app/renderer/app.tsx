import { FC } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';
import Title from './title';
import testImg from '../../public/img/test.jpg';

const App: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
              <Title text="这是测试标题"></Title>
              <img src={testImg} alt="" />
            </div>
          }
        />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
