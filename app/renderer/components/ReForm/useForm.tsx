import { useEffect, useRef, useState } from 'react';
import { formInstanceApi, FormStore } from './FormStore';

export function useForm(defaultFormValue = {}) {
  const formRef = useRef<Pick<FormStore, typeof formInstanceApi[number]> | null>(null);
  const [, forceUpdate] = useState({});
  defaultFormValue = Array.isArray(defaultFormValue)
    ? {
        list: defaultFormValue,
      }
    : defaultFormValue;
  console.log('useForm', defaultFormValue);
  const formStoreCurrent = new FormStore(forceUpdate, defaultFormValue);
  formRef.current = formStoreCurrent.getFormApi();

  return formRef.current;
}
