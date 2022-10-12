import { store } from '@root/app/renderer/store';
import { cloneElement, FC } from 'react';
import { Provider } from 'react-redux';

interface IModelProviderProps {
  children: React.ReactElement;
}

const ModelProvider: FC<IModelProviderProps> = ({ children, ...props }) => {
  return (
    <Provider store={store}>
      {cloneElement(children, {
        ...props,
      })}
    </Provider>
  );
};

export default ModelProvider;
