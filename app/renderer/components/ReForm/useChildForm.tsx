import { useContext, useEffect, useState } from 'react';
import FormContext from './FormContext';
import { IFormApi } from './FormStore';

export const useChildForm = (name: string, childInstance: IFormApi) => {
  if (!name) return;
  console.log('useChildForm');

  const fatherInstance = useContext(FormContext);
  const { registerValidateForms, unRegisterValidateForms, dispatch } = fatherInstance;
  const [, forceUpdate] = useState({});
  const onStoreChange = {
    changeValue() {
      // forceUpdate({});
    },
  };
  useEffect(() => {
    const id = registerValidateForms(name, onStoreChange, {
      instance: childInstance,
      required: false,
    });

    return () => {
      unRegisterValidateForms(name, id);
    };
  }, []);
};
