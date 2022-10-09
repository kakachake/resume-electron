import { Rule } from 'json-schema';
import React, {
  cloneElement,
  FC,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import FormContext from './FormContext';
import { ModelType } from './FormStore';
import Label from './Label/Label';
import Message from './Message/Message';

interface IFormItem {
  name: string;
  label: string;
  height?: number;
  labelWidth?: number;
  required?: boolean;
  trigger?: string;
  validateTrigger?: string;
  rules?: Rule;
  children: React.ReactElement;
}

const FormItem: FC<IFormItem> = ({
  name,
  label,
  height,
  labelWidth,
  required = false,
  trigger = 'onChange',
  validateTrigger = 'onChange',
  rules,
  children,
}) => {
  const formInstance = useContext(FormContext);
  const { registerValidateFields, unRegisterValidate, dispatch } = formInstance;
  const [, forceUpdate] = useState({});
  const field = dispatch('getFieldModel', name) as ModelType;

  const onStoreChange = {
    changeValue() {
      forceUpdate({});
    },
  };
  useEffect(() => {
    name &&
      registerValidateFields(name, onStoreChange, {
        ...rules,
        required,
      });
    return () => {
      name && unRegisterValidate(name);
    };
  }, [formInstance]);

  // 拦截表单元素的onChange事件， 用于表单元素的值变化时，更新表单的值，从而触发表单的校验
  const getControlled = (child: React.ReactElement) => {
    const mergeChildProps = { ...child.props };
    if (!name) return mergeChildProps;
    const handleChange = (e: any) => {
      const value = e?.target?.value ?? e;
      dispatch('setFieldValue', name, value);
    };
    mergeChildProps[trigger] = handleChange;
    if (required || rules) {
      const temp = mergeChildProps[validateTrigger];
      mergeChildProps[validateTrigger] = (...args: any) => {
        temp && temp(...args);
        dispatch('validateFieldValue', name);
      };
    }

    mergeChildProps.value = field?.value || '';
    return mergeChildProps;
  };
  let renderChildren = children;
  if (isValidElement(children)) {
    renderChildren = cloneElement(children, getControlled(children));
  }
  return (
    <Label label={label} labelWidth={labelWidth} required={required} height={height}>
      <div>
        {renderChildren}
        {field?.status === 'error' && (
          <Message message={field?.message || '本项不能为空！'} />
        )}
      </div>
    </Label>
  );
};

export default FormItem;
