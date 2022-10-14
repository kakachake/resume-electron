import { Toast } from '@douyinfe/semi-ui';
import { IntactResume } from '@root/app/renderer/common/types/resume';
import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { IFormRef } from '@root/app/renderer/components/ReForm/Form';
import ReFormRender from '@root/app/renderer/components/ReFormRender/ReFormRender';
import { ReDialog } from '@root/app/renderer/components/ReModal/ReModal';
import {
  RESUME_TOOLBAR_LIST,
  RESUME_TOOLBAR_MAPS,
} from '@root/app/renderer/constants/resume';
import { useAppDispatch, useAppSelector } from '@root/app/renderer/store';
import { updateResume } from '@root/app/renderer/store/slice/resume';
import { FC, useRef } from 'react';
import ModelProvider from './ModelProvider';
import styles from './Index.module.less';
import { resumeAdapter, resumeSchema } from './schemas/schema';

export interface IResumeModalProps {
  destroy?: () => void;
  type: keyof IntactResume;
}

export const ResumeModals: FC<IResumeModalProps> & {
  showModal: ({ type }: { type: keyof IntactResume }) => void;
} = ({ destroy, type }) => {
  const schema = (resumeSchema as any)[type];
  const adapter = (resumeAdapter as any)[type + 'Adapter'] || {
    form2data: (data: any) => data,
    data2form: (data: any) => data,
  };
  const { [type]: initialValues } = useAppSelector((state) => {
    console.log(state.resume.resume);
    return state.resume.resume;
  });
  console.log(type, initialValues);

  const dispatch = useAppDispatch();
  const formRef = useRef<IFormRef>(null);
  const submit = () => {
    formRef.current?.submit((err: any, formValue: any, errMsg: string) => {
      if (err) {
        Toast.error(errMsg);
      } else {
        console.log(formValue);

        dispatch(
          updateResume({
            key: type,
            value: adapter.form2data(formValue),
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
        schema={schema}
        className={styles.form}
        initialValues={adapter.data2form(initialValues)}
      />
      <ReButton onClick={submit}>提交</ReButton>
      <ReButton onClick={destroy}>关闭</ReButton>
    </div>
  );
};

ResumeModals.showModal = ({ type }: { type: keyof IntactResume }) => {
  ReDialog.confirm({
    title: RESUME_TOOLBAR_LIST.find(
      (item) => item.key === (RESUME_TOOLBAR_MAPS as any)[type]
    )!.name,
    children: (
      <ModelProvider>
        <ResumeModals type={type} />
      </ModelProvider>
    ),
  });
};

// 下方已不需要，上面代码对下方组件进一步封装
// export default {
//   base: Base,
//   contact: Contact,
// };
