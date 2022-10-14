import { FC, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import ReInput from '../ReInput/ReInput';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import styles from './ReMarkDown.module.less';

interface IReMarkDownProps {
  value: string;
  onChange: (...args: any) => void;
}

const ReMarkDown: FC<IReMarkDownProps> = ({ value, onChange }) => {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e);
  };
  return (
    <Tabs>
      <TabPane tab="编辑" itemKey="1">
        <ReInput value={value} onChange={_onChange} autoHeight controlType="textarea" />
      </TabPane>
      <TabPane tab="预览" itemKey="2">
        <div className={styles.preview}>
          <Markdown>{value}</Markdown>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ReMarkDown;
