import { Schema } from 'json-schema';
import { FC } from 'react';
import { RenderFormArray } from './RenderFormArray/RenderFormArray';
import RenderFormGroup from './RenderFormGroup/RenderFormGroup';
import RenderFormItem from './RenderFormItem';

interface IRenderPropertiesProps {
  properties: Schema['properties'];
  initialValues?: any;
}

export const RenderProperties: FC<IRenderPropertiesProps> = ({
  properties,
  initialValues,
}) => {
  return properties ? (
    <>
      {Object.keys(properties).map((key) => {
        switch (properties[key].type) {
          case 'object':
            return (
              <RenderFormGroup
                initialValues={initialValues}
                key={key}
                schema={properties[key]}
              />
            );
          case 'array':
            return (
              <RenderFormArray
                initialValues={initialValues}
                key={key}
                name={key}
                schema={properties[key]}
              />
            );
          default:
            return <RenderFormItem key={key} name={key} property={properties[key]} />;
        }
      })}
    </>
  ) : (
    <>"schema's properties is undefined"</>
  );
};
