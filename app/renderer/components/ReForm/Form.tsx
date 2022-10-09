import { FC, forwardRef, useImperativeHandle } from 'react';
import FormContext from './FormContext';
import { FormStore, IFormApi } from './FormStore';
import { useForm } from './useForm';

export type IFormRef = IFormApi;

export interface IFormProps {
  initialValues?: any;
  children: React.ReactElement[] | React.ReactElement;
  onFinishFailed?: Function;
  onFinish?: (...args: any) => void;
}

const Form = (
  { initialValues, children, onFinishFailed, onFinish }: IFormProps,
  ref: React.Ref<IFormRef>
) => {
  const formInstance = useForm(initialValues);
  const { setCallback, dispatch, ...providerFormInstance } = formInstance;

  formInstance.setCallback({
    onFinish,
    onFinishFailed,
  });

  useImperativeHandle(ref, () => formInstance);

  const RenderChildren = (
    <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
  );

  return (
    <div>
      <form
        onReset={(e) => {
          e.preventDefault();
          e.stopPropagation();
          formInstance.resetFields(); /* 重置表单 */
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          formInstance.submit(); /* 提交表单 */
        }}
      >
        {RenderChildren}
      </form>
    </div>
  );
};

export default forwardRef<IFormRef, IFormProps>(Form);
