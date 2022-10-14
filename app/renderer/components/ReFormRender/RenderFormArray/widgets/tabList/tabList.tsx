import { IconDelete } from '@douyinfe/semi-icons';
import { TabPane, Tabs } from '@douyinfe/semi-ui';
import { Schema } from 'json-schema';
import { FC } from 'react';
import ReButton from '../../../../ReButton/ReButton';

import { useFormsList } from '../useFormsList';
import styles from './tablist.module.less';

export interface ISimpleListProps {
  schema: Schema;
  name: string;
  initialValues?: any[];
  title: string;
}

export const TabList: FC<ISimpleListProps> = ({ schema, name, initialValues, title }) => {
  const [forms, deleteForm, addForm] = useFormsList(schema, name, initialValues);
  return (
    <>
      <Tabs
        className={styles.formContent}
        tabBarExtraContent={
          <div className={styles.formAdd}>
            <ReButton onClick={addForm}>新增</ReButton>
          </div>
        }
        collapsible
      >
        {forms.map((Item, idx) => {
          return (
            <TabPane
              tab={title + '-' + (idx + 1)}
              key={(Item as any).key}
              itemKey={idx + ''}
            >
              <div className={styles.formItem}>
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
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};
