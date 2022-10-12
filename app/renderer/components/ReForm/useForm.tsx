import { useEffect, useRef, useState } from 'react';
import { formInstanceApi, FormStore } from './FormStore';

export function useForm(defaultFormValue = {}) {
  console.log('useForm', defaultFormValue);

  const formRef = useRef<Pick<FormStore, typeof formInstanceApi[number]> | null>(null);
  const [, forceUpdate] = useState({});

  const formStoreCurrent = new FormStore(forceUpdate, defaultFormValue);
  formRef.current = formStoreCurrent.getFormApi();

  return formRef.current;
}
