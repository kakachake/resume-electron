import { forwardRef, useContext, useImperativeHandle } from 'react';
import FormContext from './FormContext';
import { IFormApi } from './FormStore';
import { useChildForm } from './useChildForm';
import { useForm } from './useForm';

export type IFormRef = IFormApi;

export interface IFormProps {
  initialValues?: any;
  children: React.ReactElement[] | React.ReactElement;
  onFinishFailed?: Function;
  onFinish?: (...args: any) => void;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
}

const Form = (
  {
    initialValues,
    children,
    onFinishFailed,
    onFinish,
    style,
    className,
    name = '',
  }: IFormProps,
  ref: React.Ref<IFormRef>
) => {
  const formInstance = useForm(initialValues);
  const { setCallback, dispatch, ...providerFormInstance } = formInstance;
  useChildForm(name, formInstance);

  formInstance.setCallback({
    onFinish,
    onFinishFailed,
  });

  useImperativeHandle(ref, () => formInstance);

  const RenderChildren = (
    <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
  );

  return (
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
      style={style}
      className={className}
    >
      {RenderChildren}
    </form>
  );
};

export default forwardRef<IFormRef, IFormProps>(Form);
