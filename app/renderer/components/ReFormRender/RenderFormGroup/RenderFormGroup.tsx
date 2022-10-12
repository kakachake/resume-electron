import { Schema } from 'json-schema';
import { FC } from 'react';
import RenderFormItem from '../RenderFormItem';
import { RenderProperties } from '../RenderProperties';
import styles from './RenderFormGroup.module.less';

interface RenderFormGroupProps {
  schema: Schema;
  className?: string;
}

const RenderFormGroup: FC<RenderFormGroupProps> = ({ schema }) => {
  const { properties } = schema;
  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>
        {schema.title && <span>{schema.title}</span>}
      </div>
      <div className={styles.groupContent}>
        <RenderProperties properties={properties} />
      </div>
    </div>
  );
};

export default RenderFormGroup;
