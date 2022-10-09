import { Schema } from 'json-schema';
import { FC, forwardRef, useRef } from 'react';
import { IFormRef } from '../ReForm/Form';
import ReForm from '../ReForm/ReForm';
import RenderFormItem from './RenderFormItem';

export interface IReFormRenderProps {
  schema: Schema;
}

const ReFormRender = ({ schema }: IReFormRenderProps, formRef: React.Ref<IFormRef>) => {
  const { properties } = schema;
  return properties ? (
    <ReForm.Form ref={formRef}>
      {Object.keys(properties).map((key) => {
        return (
          <RenderFormItem
            key={key}
            name={key}
            property={properties[key]}
          ></RenderFormItem>
        );
      })}
    </ReForm.Form>
  ) : (
    <>"schema's properties is undefined"</>
  );
};

export default forwardRef<IFormRef, IReFormRenderProps>(ReFormRender);
