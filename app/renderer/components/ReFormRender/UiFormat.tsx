import { Avatar, DatePicker, Toast } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { IconCamera } from '@douyinfe/semi-icons';
import ReInput, { ReInputProps } from '../ReInput/ReInput';
import { Schema } from 'json-schema';
import ReUpload from '../ReUpload/ReUpload';

import {
  OnChangeType,
  Type,
} from '@douyinfe/semi-foundation/lib/es/datePicker/foundation';

export const UiFormat: {
  [key in
    | 'input'
    | 'image'
    | 'textarea'
    | 'color'
    | 'email'
    | 'url'
    | 'dateTime'
    | 'date'
    | 'time'
    | 'upload']?: React.FC<any>;
} = {
  textarea: (props: any) => <ReInput {...props} controlType="textarea" />,
  dateTime: function DateTimeAdpter({
    type,
    onChange,
    value,
  }: {
    type: Schema['type'];
    onChange: (value: string) => void;
    value: string;
  }) {
    let defaultValue = value.split(',');
    let _type: Type = type === 'range' ? 'dateRange' : 'date';
    const _onChange: OnChangeType = (date, dateString) => {
      onChange(dateString?.toString() || '');
    };

    return <DatePicker value={defaultValue} type={_type} onChange={_onChange} />;
  },
  input: ReInput,
  image: function Image({
    onChange,
    value,
  }: {
    onChange: (value: any) => void;
    value: string;
  }) {
    const [url, setUrl] = useState(value);
    console.log(value);

    function _onChange(fileList: TSUpload.File[]) {
      console.log(fileList[0]?.base64URL);

      onChange && onChange(fileList[0]?.base64URL);
    }
    const style = {
      backgroundColor: 'var(--semi-color-overlay-bg)',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--semi-color-white)',
    };

    const hoverMask = (
      <div style={style}>
        <IconCamera />
      </div>
    );
    return (
      <ReUpload onChange={_onChange} accept="image/*">
        <Avatar src={value} style={{ margin: 4 }} hoverMask={hoverMask} />
      </ReUpload>
    );
  },
};
