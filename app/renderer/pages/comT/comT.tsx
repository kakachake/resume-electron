import { FC, useContext, useState } from 'react';
import ReButton from '../../components/ReButton/ReButton';
import ReInput from '../../components/ReInput/ReInput';
import { ReDialog } from '../../components/ReModal/ReModal';
import ReScrollBox from '../../components/ReScrollBox/ReScrollBox';
import ReUpload from '../../components/ReUpload/ReUpload';
import { ThemeContext, themeType } from '../../context/themeContext';

const ComT: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const height = document.documentElement.clientHeight;
  console.log('height', height);

  const toogleTheme = () => {
    console.log(theme);

    setTheme(theme === themeType.dark ? themeType.light : themeType.dark);
  };
  return (
    <div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <ReButton onClick={() => toogleTheme()} type="primary" size="middle">
          切换主题
        </ReButton>
      </div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <h1>button</h1>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <ReButton type="default" size="large">
            按钮
          </ReButton>
          <ReButton type="primary" size="small">
            按钮
          </ReButton>
          <ReButton type="warning">按钮</ReButton>
          <ReButton type="danger" size="middle">
            按钮
          </ReButton>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <h1>Input</h1>
        <ReInput
          addonBefore="http://"
          addonAfter="Suffix"
          placeholder="请输入内容"
          value={value}
          onChange={(e) => {
            console.log('set', e.target.value);

            setValue(e.target.value);
          }}
        />
        <ReInput
          controlType="textarea"
          value={value}
          placeholder="请输入内容"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {value}
      </div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <h1>Modal</h1>
        <ReButton
          onClick={() => {
            setVisible(true);
            ReDialog.confirm({
              title: '测试',
              children: <div>测试</div>,
              config: {
                cancelBtn: {
                  show: true,
                  text: '取消',
                  callback: () => {
                    console.log('cancel');
                  },
                },
                submitBtn: {
                  show: true,
                  text: '确定',
                  callback: () => {
                    console.log('submit');
                  },
                },
              },
            });
          }}
        >
          打开弹窗
        </ReButton>
        <ReDialog
          visible={visible}
          config={{
            cancelBtn: {
              show: true,
              text: '取消',
              callback: () => {
                console.log('cancel');
                setVisible(false);
              },
            },
            submitBtn: {
              show: true,
              text: '确定',
              callback: () => {
                console.log('submit');
                setVisible(false);
              },
            },
          }}
          title="测试"
          showFooter
        >
          这是内容
        </ReDialog>
      </div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <h1>ScrollBox</h1>
        <ReScrollBox maxHeight={300}>
          <div>More information about the Git mailing list</div>
          <div>More information about the Git mailing </div>
          <div>More information about the Git list</div>
          <div>More information about the mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More information about the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div> information about the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div>More information about the Git mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More information about Git mailing list</div>
          <div>More information about the mailing list</div>
          <div>More information about the Git list</div>
          <div>More information about the Git mailing </div>
          <div>More information about the mailing list</div>
          <div>More information about Git mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div> information about the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More information about Git mailing list</div>
          <div>More information about the Git mailing list</div>
          <div>More information about the mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div>More information about Git mailing list</div>
          <div>More information about the mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div> information about the Git mailing list</div>
          <div>More about the Git mailing list</div>
          <div>More information the Git mailing list</div>
          <div>More information about Git mailing list</div>
        </ReScrollBox>
      </div>
      <div style={{ borderBottom: '1px solid var(--primary-color)' }}>
        <h1>Upload</h1>
        <ReUpload multiple />
      </div>
    </div>
  );
};

export default ComT;
