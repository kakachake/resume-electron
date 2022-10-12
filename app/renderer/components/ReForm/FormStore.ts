import { unstable_batchedUpdates } from 'react-dom';
import { getRandomId } from '../../utils';

export const CHILD = Symbol('child');

/* 对外接口  */
export const formInstanceApi = [
  'setCallback',
  'dispatch',
  'registerValidateFields',
  'resetFields',
  'setFields',
  'setFieldValue',
  'getFieldsValue',
  'getFieldValue',
  'validateFields',
  'submit',
  'unRegisterValidate',
  'registerValidateForms',
  'unRegisterValidateForms',
] as const;

export type IFormApi = Pick<FormStore, typeof formInstanceApi[number]>;

/* 判断是否是正则表达式 */
const isReg = (value: any) => value instanceof RegExp;

export type ModelType = {
  value: any;
  rule?: RegExp | ((value: any) => boolean) | undefined;
  message?: string;
  required: boolean;
  status: STATUS;
  type?: 'default' | 'form';
  instance?: IFormApi;
};

export type STATUS = 'pending' | 'success' | 'error';

export class FormStore {
  FormUpdate: Function;
  model: {
    [key: string]: ModelType;
  } = {};
  control: {
    [key: string]:
      | {
          changeValue: Function;
        }
      | {
          changeValue: Function;
        }[];
  } = {};
  isSchedule = false;
  penddingValidateQueue: ((...args: any) => void)[] = [];
  defaultFormValue: {
    [key: string]: any;
  } = {};
  callback: {
    onFinishFailed?: Function;
    onFinish?: (...args: any) => void;
    onChange?: (formValue: any) => void;
  } = {};
  childForm: IFormApi[] = [];
  constructor(forceUpdate: Function, defaultFormValue = {}) {
    this.FormUpdate = forceUpdate;
    this.defaultFormValue = defaultFormValue;
  }

  getFormApi(): Pick<FormStore, typeof formInstanceApi[number]> {
    return (formInstanceApi as unknown as any[]).reduce(
      (
        map: {
          [key in typeof formInstanceApi[number]]: Function;
        },
        item: typeof formInstanceApi[number]
      ) => {
        map[item] = (this as any)[item].bind(this);
        return map;
      },
      {}
    ) as {
      [key in typeof formInstanceApi[number]]: any;
    };
  } /* 创建一个验证模块 */

  static createValidate(
    validate: Omit<ModelType, 'status' | 'value'> & Partial<Pick<ModelType, 'value'>>
  ): ModelType {
    const { value = '', rule, required, message, instance, type = 'default' } = validate;
    return {
      value,
      rule: rule || (() => true),
      required: required || false,
      message: message || '',
      status: 'pending',
      instance,
      type,
    };
  }

  setCallback(callback: {
    onFinishFailed?: Function;
    onFinish?: (...args: any) => void;
    onChange?: (formValue: any) => void;
  }) {
    this.callback = callback;
  }

  dispatch(action: keyof FormStore, ...args: any) {
    if (action) {
      return (this[action as keyof FormStore] as Function)(...args);
    }
  }

  static createFormModel() {
    return FormStore.createValidate({
      value: [],
      required: false,
      rule: () => true,
      type: 'form',
    });
  }

  registerValidateForms(
    name: string,
    control: {
      changeValue: Function;
    },
    model: Omit<ModelType, 'status' | 'value'> & Partial<Pick<ModelType, 'instance'>>
  ) {
    const validate = FormStore.createValidate(model);
    const _control = this.control[name];
    Array.isArray(_control) ? _control.push(control) : (this.control[name] = [control]);
    this.model[name] = this.model[name] ?? FormStore.createFormModel();
    const id = this.model[name].value.push(validate) - 1;
    if (this.defaultFormValue[name]) {
      const notify = this.notifyChange.bind(this, name);
      this.penddingValidateQueue.push(notify);
    }
    this.scheduleValidate();
    return id;
  }

  unRegisterValidateForms(name: string, id: number) {
    const model = this.model[name];
    if (model) {
      model.value.splice(id, 1);
    }
    const control = this.control[name];
    if (Array.isArray(control)) {
      control.splice(id, 1);
    }
  }

  registerValidateFields(
    name: string,
    control: {
      changeValue: Function;
    },
    model: Omit<ModelType, 'status' | 'value'> & Partial<Pick<ModelType, 'value'>>
  ) {
    if (this.defaultFormValue[name]) model.value = this.defaultFormValue[name];
    const validate = FormStore.createValidate(model);
    this.control[name] = control;
    this.model[name] = validate;
    if (this.defaultFormValue[name]) {
      const notify = this.notifyChange.bind(this, name);
      this.penddingValidateQueue.push(notify);
    }
    this.scheduleValidate();
  }

  unRegisterValidate(name: string) {
    delete this.model[name];
    delete this.control[name];
  }

  notifyChange(name: string) {
    const controller = this.control[name];
    if (controller && Array.isArray(controller)) {
      controller.forEach((item) => {
        item.changeValue();
      });
    } else if (controller && controller.changeValue) {
      controller.changeValue();
    }
    if (this.callback.onChange) {
      this.callback.onChange(this.getFieldsValue());
    }
  }

  resetFields() {
    Object.keys(this.model).forEach((name) => {
      this.setValueClearStatus(this.model[name], name, null);
    });
  }

  setFieldValue(name: string, modelValue: Omit<ModelType, 'status'> | string) {
    const model = this.model[name];
    if (!model) return false;
    if (typeof modelValue === 'string' || !modelValue) {
      this.setValueClearStatus(model, name, modelValue);
    } else {
      const { value, rule, required, message } = modelValue;
      model.value = value;
      model.rule = rule;
      model.required = required;
      model.message = message;
      model.status = 'pending';
      this.validateFieldValue(name, true);
    }
  }

  setFields(object: { [key: string]: Omit<ModelType, 'status'> }) {
    if (typeof object !== 'object') return;
    Object.keys(object).forEach((modelName) => {
      this.setFieldValue(modelName, object[modelName]);
    });
  }

  setValueClearStatus(model: ModelType, name: string, value: any) {
    model.value = value;
    model.status = 'pending';
    this.notifyChange(name);
  }

  getFieldsValue() {
    const formData: {
      [key: string | symbol]: any;
    } = {};
    console.log(this.model);
    Object.keys(this.model).forEach((name) => {
      if (this.model[name].type === 'form') {
        formData[name] = this.model[name].value.map((item: ModelType) =>
          item!.instance!.getFieldsValue()
        );
      } else {
        formData[name] = this.getFieldValue(name);
      }
    });

    return formData;
  }

  getFieldModel(name: string) {
    return this.model[name] ?? null;
  }

  getFieldValue(name: string) {
    const model = this.model[name];
    if (!model && this.defaultFormValue[name]) return this.defaultFormValue[name];
    return model ? model.value : null;
  }

  validateFieldValue(name: string, forceUpdate = false) {
    const model = this.model[name];
    const lastStatus = model.status;
    const { value, rule, required, message } = model;
    let status: STATUS = 'pending';

    if (required && !value) {
      status = 'error';
    } else if (rule && rule instanceof RegExp && !rule?.test(value)) {
      status = 'error';
    } else if (typeof rule === 'function') {
      status = rule(value) ? 'success' : 'error';
    }
    model.status = status;
    if (forceUpdate || lastStatus !== status) {
      const notify = this.notifyChange.bind(this, name);
      this.penddingValidateQueue.push(notify);
    }
    this.scheduleValidate();
    return status;
  }

  scheduleValidate() {
    if (!this.isSchedule) {
      this.isSchedule = true;
      Promise.resolve().then(() => {
        unstable_batchedUpdates(() => {
          this.penddingValidateQueue.forEach((notify) => notify());
          this.penddingValidateQueue = [];
          this.isSchedule = false;
        });
      });
    }
  }

  validateFields(callback: (status: boolean, msg?: string) => void) {
    let error = false;
    let message = '';

    Object.keys(this.model).forEach((modelName: string) => {
      const modelStatus = this.validateFieldValue(modelName, true);
      if (modelStatus === 'error') {
        message = this.model[modelName].message || '请检查输入是否有误';
        error = true;
      }
    });
    callback(!!error, message);
  }
  submit(cb?: Function) {
    console.log(this.model);

    this.validateFields((res, msg) => {
      const { onFinish, onFinishFailed } = this.callback;
      cb && cb(res, this.getFieldsValue(), msg);
      if (!res)
        onFinishFailed &&
          typeof onFinishFailed === 'function' &&
          onFinishFailed(); /* 验证失败 */
      onFinish &&
        typeof onFinish === 'function' &&
        onFinish(this.getFieldsValue()); /* 验证成功 */
    });
  }
}
