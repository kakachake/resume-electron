import { FC, useEffect, useMemo } from 'react';
import style from './Root.module.less';
import logo from '@assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { shell } from 'electron';
import { ROUTER_ENTRY } from '../../constants/router';
import { compilePath, isHttpOrHttps } from '../../utils/router';
import { useAppDispatch, useAppSelector } from '../../store';
import { useOpenWindow } from '../../hooks/useOpenWindow';
import ReTheme from '../../components/ReTheme/ReTheme';
import { Modal } from '@douyinfe/semi-ui';

const Root: FC = () => {
  const openWindow = useOpenWindow();
  const selectedTemplate = useAppSelector((state) => state.template.selectedTemplate);

  const appName = useAppSelector((state) => state.global.appName);

  const navigate = useNavigate();

  const onRouterToLink = (item: typeof ROUTER_ENTRY[number]) => {
    if (isHttpOrHttps(item.link)) {
      console.log('openWindow', openWindow);

      openWindow.current?.(item.link);
    } else {
      if (item.name && item.name == 'resume') {
        if (selectedTemplate) {
          navigate(compilePath(item.link, { id: '123' }));
        } else {
          Modal.info({
            title: '暂未选择模板',
            content: '前去模板仓库选择？',
            onOk: () => {
              navigate(compilePath('/templateList'));
            },
          });
        }
      } else {
        navigate(item.link);
      }
    }
  };

  return (
    <div className={style.root}>
      <div className={style.container}>
        <img className="logo" src={logo} alt="" />
        <div className={style.title}>{appName}</div>
        <div className={style.tips}>一个模板简历制作平台, 让你的简历更加出众 ~!</div>
        <div>
          <ReTheme />
        </div>
        <div className={style.action}>
          {ROUTER_ENTRY.map((menu, idx) => {
            return (
              <div
                key={menu.link}
                onClick={() => onRouterToLink(menu)}
                className={style.item}
              >
                {menu.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.copyright}>
        <div>
          <p>
            Copyright © 2022-{new Date().getFullYear()} All Rights Reserved. Copyright By{' '}
            <a
              className={style.link}
              onClick={() => {
                openWindow.current?.('https://github.com/kakachake');
              }}
              style={{ cursor: 'pointer' }}
              target="_blank"
            >
              kakachake
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Root;
