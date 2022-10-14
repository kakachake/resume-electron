import { IconDelete } from '@douyinfe/semi-icons';
import { Schema } from 'json-schema';
import { FC } from 'react';
import ReButton from '../../../../ReButton/ReButton';

import { useFormsList } from '../useFormsList';
import styles from './SimpleList.module.less';

export interface ISimpleListProps {
  schema: Schema;
  name: string;
  initialValues?: any[];
}

export const SimpleList: FC<ISimpleListProps> = ({ schema, name, initialValues }) => {
  const [forms, deleteForm, addForm] = useFormsList(schema, name, initialValues);
  return (
    <>
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
        <ReButton onClick={addForm}>新增</ReButton>
      </div>
    </>
  );
};
