import { Schema } from 'json-schema';
import { FC, forwardRef, useRef } from 'react';
import { IFormRef } from '../ReForm/Form';
import ReForm from '../ReForm/ReForm';

import { RenderProperties } from './RenderProperties';

export interface IReFormRenderProps {
  schema: Schema;
  className?: string;
  initialValues?: any;
  name?: string;
}

const ReFormRender = (
  { schema, className, initialValues, name }: IReFormRenderProps,
  formRef: React.Ref<IFormRef>
) => {
  console.log(schema);

  const { properties, flex = true } = schema;
  return properties ? (
    <ReForm.Form
      name={name}
      ref={formRef}
      className={className}
      initialValues={initialValues}
      style={{
        display: flex ? 'flex' : 'block',
      }}
    >
      <RenderProperties initialValues={initialValues} properties={properties} />
    </ReForm.Form>
  ) : (
    <>"schema's properties is undefined"</>
  );
};

export default forwardRef<IFormRef, IReFormRenderProps>(ReFormRender);
