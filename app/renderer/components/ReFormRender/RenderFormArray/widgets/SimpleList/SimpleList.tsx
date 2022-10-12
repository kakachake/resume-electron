import { getRandomId } from '@root/app/renderer/utils';
import { Schema } from 'json-schema';
import React, { FC, memo, useState } from 'react';
import ReButton from '../../../../ReButton/ReButton';
import { IFormRef } from '../../../../ReForm/Form';
import ReFormRender from '../../../ReFormRender';
import { RenderProperties } from '../../../RenderProperties';
import styles from './SimpleList.module.less';

interface ISimpleListProps {
  schema: Schema;
  name: string;
}

export const SimpleList: FC<ISimpleListProps> = ({ schema, name }) => {
  const getReFormRender = (idx: number) => {
    const Item = memo(() => (
      <ReFormRender ref={(el) => addRef(idx, el)} schema={schema} name={name} />
    ));
    (Item as any).key = getRandomId();
    return Item;
  };
  const [forms, setForms] = useState<React.MemoExoticComponent<() => JSX.Element>[]>([
    getReFormRender(0),
  ]);
  const [formList, setFormList] = useState<IFormRef[]>([]);
  const addRef = (idx: number, el: any) => {
    setFormList((formList) => {
      formList[idx] = el;
      return formList;
    });
  };

  const deleteForm = (idx: number) => {
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
      <div>
        {forms.map((Item, idx) => {
          return (
            <div key={(Item as any).key} className={styles.formItem}>
              <div className={styles.mainForm}>
                <Item />
              </div>
              <div className={styles.operation}>
                <ReButton
                  onClick={() => {
                    deleteForm(idx);
                  }}
                >
                  delete
                </ReButton>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <ReButton
          onClick={() => {
            setForms((forms) => {
              const _forms = [...forms];
              _forms.push(getReFormRender(forms.length));
              return _forms;
            });
          }}
        >
          add
        </ReButton>
      </div>
    </div>
  );
};
