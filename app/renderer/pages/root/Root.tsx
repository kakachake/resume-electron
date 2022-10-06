import { FC, useEffect, useMemo } from 'react';
import style from './Root.module.less';
import logo from '@assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { shell } from 'electron';
import { ROUTER_ENTRY } from '../../constants/router';
import { isHttpOrHttps } from '../../utils/router';
import { useAppDispatch, useAppSelector } from '../../store';
import { setAppName } from '@src/store/slice/global';
const Root: FC = () => {
  const appName = useAppSelector((state) => state.global.appName);

  const navigate = useNavigate();

  const onRouterToLink = (item: typeof ROUTER_ENTRY[number]) => {
    if (isHttpOrHttps(item.link)) {
      shell.openExternal(item.link);
    } else {
      navigate(item.link);
    }
  };
  return (
    <div className={style.root}>
      <div className={style.container}>
        <img src={logo} alt="" />
        <div className={style.title}>{appName}</div>
        <div className={style.tips}>一个模板简历制作平台, 让你的简历更加出众 ~</div>
        <div className={style.action}>
          {ROUTER_ENTRY.map((menu, idx) => {
            return (
              <div key={menu.link} onClick={() => onRouterToLink(menu)} className={style.item}>
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
                shell.openExternal('https://github.com/kakachake');
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