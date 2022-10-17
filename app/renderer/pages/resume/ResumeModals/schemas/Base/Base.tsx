import { Toast } from '@douyinfe/semi-ui';
import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { IFormRef } from '@root/app/renderer/components/ReForm/Form';

import ReFormRender from '@root/app/renderer/components/ReFormRender/ReFormRender';

import ReDialog from '@root/app/renderer/components/ReModal/ReDialog/ReDialog';
import {
  RESUME_TOOLBAR_LIST,
  RESUME_TOOLBAR_MAPS,
} from '@root/app/renderer/constants/resume';
import { FC, useContext, useRef } from 'react';
import { baseSchema } from './baseSchema';
import styles from './Base.module.less';
import { store, useAppDispatch, useAppSelector } from '@root/app/renderer/store';
import { Provider } from 'react-redux';
import { updateResume } from '@root/app/renderer/store/slice/resume';
import ModelProvider from '../../ModelProvider';

interface IBaseProps {
  destroy?: () => void;
}

const Base: FC<IBaseProps> & {
  showModal: () => void;
} = ({ destroy }) => {
  const { base: initialValues } = useAppSelector((state) => state.resume.resume);
  const dispatch = useAppDispatch();
  const formRef = useRef<IFormRef>(null);
  const submit = () => {
    formRef.current?.submit((err: any, formValue: any, errMsg: string) => {
      if (err) {
        Toast.error(formValue);
      } else {
        dispatch(
          updateResume({
            key: 'base',
            value: formValue,
          })
        );
        destroy?.();
        Toast.success('修改成功');
      }
    });
  };

  return (
    <div>
      <ReFormRender
        ref={formRef}
        schema={baseSchema}
        className={styles.form}
        initialValues={initialValues}
      />
      <ReButton onClick={submit}>提交</ReButton>
      <ReButton onClick={destroy}>关闭</ReButton>
    </div>
  );
};

Base.showModal = () => {
  ReDialog.confirm({
    title: RESUME_TOOLBAR_LIST.find((item) => item.key === RESUME_TOOLBAR_MAPS.base)!
      .name,
    children: (
      <ModelProvider>
        <Base />
      </ModelProvider>
    ),
  });
};

export default Base;
