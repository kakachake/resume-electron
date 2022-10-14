import { getRandomId } from '@root/app/renderer/utils';
import { Schema } from 'json-schema';
import { memo, useEffect, useState } from 'react';
import { IFormRef } from '../../../ReForm/Form';
import ReFormRender from '../../ReFormRender';

export const useFormsList = (schema: Schema, name: string, initialValues: any) => {
  const getReFormRender = (idx: number) => {
    const Item = memo(() => (
      <ReFormRender ref={(el) => addRef(idx, el)} schema={schema} name={name} />
    ));
    (Item as any).key = getRandomId();
    return Item;
  };
  const [forms, setForms] = useState<React.MemoExoticComponent<() => JSX.Element>[]>([]);
  const [formList, setFormList] = useState<IFormRef[]>([]);
  const addRef = (idx: number, el: any) => {
    setFormList((formList) => {
      formList[idx] = el;
      return formList;
    });
  };

  useEffect(() => {
    const len = initialValues?.length || 0;
    const newForms = [];
    for (let i = 0; i < len; i++) {
      newForms.push(getReFormRender(i));
    }
    setForms(newForms);
  }, [initialValues]);

  const deleteForm = (idx: number) => {
    const formRef = formList[idx];

    setForms((forms) => {
      const _form = forms.filter((_, i) => i !== idx);

      return _form;
    });
    setFormList((formList) => {
      const _formList = formList.filter((_, i) => i !== idx);

      return _formList;
    });
  };
  const addForm = () => {
    setForms((forms) => {
      const _forms = [...forms];
      _forms.push(getReFormRender(forms.length));
      return _forms;
    });
  };
  return [forms, deleteForm, addForm] as const;
};
