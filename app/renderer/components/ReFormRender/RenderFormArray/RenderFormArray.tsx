import { Schema } from 'json-schema';
import { FC } from 'react';
import { widgets } from './widgets';

type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
} & Omit<T, K>;

type WidgetSchema = CustomRequired<Schema, 'widget'>;

interface IRenderFormArrayProps {
  schema: Schema;
  className?: string;
  name: string;
  initialValues?: any;
}

export const RenderFormArray: FC<IRenderFormArrayProps> = ({
  schema,
  name,
  initialValues,
}) => {
  console.log(name);
  console.log(initialValues);

  const _initialValues: any[] = Array.isArray(initialValues)
    ? initialValues
    : initialValues[name];
  const itemSchema = schema.items as WidgetSchema;
  const widget = itemSchema.widget || 'simpleList';
  const Widget = (widgets as any)[widget];
  return (
    <div>
      <Widget initialValues={_initialValues} schema={itemSchema} name={name} />
    </div>
  );
};
