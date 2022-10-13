import { IconDelete } from '@douyinfe/semi-icons';
import { getRandomId } from '@root/app/renderer/utils';
import { Schema } from 'json-schema';
import React, { FC, memo, useEffect, useState } from 'react';
import ReButton from '../../../../ReButton/ReButton';
import { IFormRef } from '../../../../ReForm/Form';
import ReFormRender from '../../../ReFormRender';
import { RenderProperties } from '../../../RenderProperties';
import styles from './SimpleList.module.less';

interface ISimpleListProps {
  schema: Schema;
  name: string;
  initialValues?: any[];
}

export const SimpleList: FC<ISimpleListProps> = ({ schema, name, initialValues }) => {
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

  return (
    <div>
      <div className={styles.formContent}>
        {forms.map((Item, idx) => {
          return (
            <div key={(Item as any).key} className={styles.formItem}>
              <div className={styles.mainForm}>
                <Item />
              </div>
              <div className={styles.operation}>
                <ReButton
                  size="small"
                  type="danger"
                  onClick={() => {
                    deleteForm(idx);
                  }}
                >
                  <IconDelete />
                </ReButton>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.formAdd}>
        <ReButton
          onClick={() => {
            setForms((forms) => {
              const _forms = [...forms];
              _forms.push(getReFormRender(forms.length));
              return _forms;
            });
          }}
        >
          新增
        </ReButton>
      </div>
    </div>
  );
};
