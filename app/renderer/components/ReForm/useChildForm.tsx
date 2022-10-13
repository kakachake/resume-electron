import { useContext, useEffect, useState } from 'react';
import FormContext from './FormContext';
import { IFormApi } from './FormStore';

export const useChildForm = (name: string, childInstance: IFormApi) => {
  if (!name) return;
  console.log('useChildForm');

  const fatherInstance = useContext(FormContext);
  const { registerValidateForms, unRegisterValidateForms, dispatch, notifyChanges } =
    fatherInstance;

  const onStoreChange = {
    changeValue() {
      // forceUpdate({});
      console.log('changeValue');

      // childInstance.notifyChanges();
    },
  };
  useEffect(() => {
    const control = onStoreChange;
    const model = {
      instance: childInstance,
      required: false,
    };
    registerValidateForms(name, onStoreChange, model);

    return () => {
      unRegisterValidateForms(name, childInstance, control);
    };
  }, []);
};
