import { Select } from '@douyinfe/semi-ui';
import ReButton from '@root/app/renderer/components/ReButton/ReButton';
import { IFormRef } from '@root/app/renderer/components/ReForm/Form';
import ReForm from '@root/app/renderer/components/ReForm/ReForm';
import ReFormRender from '@root/app/renderer/components/ReFormRender/ReFormRender';
import ReInput from '@root/app/renderer/components/ReInput/ReInput';
import ReDialog from '@root/app/renderer/components/ReModal/ReDialog/ReDialog';
import {
  RESUME_TOOLBAR_LIST,
  RESUME_TOOLBAR_MAPS,
} from '@root/app/renderer/constants/resume';
import { FC, useRef } from 'react';
import { baseSchema } from './baseSchema';

interface IBaseProps {
  destroy?: () => void;
}

const Base: FC<IBaseProps> & {
  showModal: () => void;
} = ({ destroy }) => {
  const formRef = useRef<IFormRef>(null);
  const submit = () => {
    formRef.current?.submit((err: any, formValue: any) => {
      err && console.log(formValue);
    });
  };
  return (
    <div>
      <ReFormRender ref={formRef} schema={baseSchema} />
      {/* <ReForm.Form ref={formRef}>
        <ReForm.FormItem name="name" label="姓名" required>
          <ReInput />
        </ReForm.FormItem>
        <ReForm.FormItem name="male" label="性别" required>
          <Select defaultValue="abc" style={{ width: 120 }}>
            <Select.Option value="abc">抖音</Select.Option>
            <Select.Option value="ulikecam">轻颜相机</Select.Option>
            <Select.Option value="jianying" disabled>
              剪映
            </Select.Option>
            <Select.Option value="xigua">西瓜视频</Select.Option>
          </Select>
        </ReForm.FormItem>
      </ReForm.Form> */}
      <ReButton onClick={submit}>提交</ReButton>
      <ReButton onClick={destroy}>关闭</ReButton>
    </div>
  );
};

Base.showModal = () => {
  ReDialog.confirm({
    title: RESUME_TOOLBAR_LIST.find((item) => item.key === RESUME_TOOLBAR_MAPS.base)!
      .name,
    children: <Base />,
  });
};

export default Base;
