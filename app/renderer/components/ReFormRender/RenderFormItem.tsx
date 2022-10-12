import { Schema } from 'json-schema';
import { FC } from 'react';
import ReForm from '../ReForm/ReForm';
import { UiFormat } from './UiFormat';

interface IRenderFormItem {
  name: string;
  property: Schema;
}

const RenderFormItem: FC<IRenderFormItem> = ({ property, name }) => {
  const { title, type, placeholder, required = false, format = 'input', rule } = property;
  const RenderUi = (UiFormat as any)[format];

  return (
    <ReForm.FormItem name={name} label={title!} required={required} rules={rule}>
      <RenderUi width={'100%'} placeholder={placeholder} type={type} />
    </ReForm.FormItem>
  );
};

export default RenderFormItem;
