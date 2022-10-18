import { getAppPath } from '@src/utils/appPath';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import path from 'path';
import { setCurrentTheme, setThemeList, ThemeStore } from '../store/slice/theme';
import fileAction from '@src/utils/file';
import { tintColor } from '../utils/color';

const isWeb = process.env.target === 'web';

const CSS_VARS = [
  'primary-color',
  'primary-background-color',
  'primary-second-background-color',
];

export function useInitThemeConfig() {
  const dispatch = useAppDispatch();
  const changeCurrentTheme = useChangeCurrentTheme();
  useEffect(() => {
    readAppConfigThemeFile().then((value: ThemeStore) => {
      const { themeList, currentTheme } = value;
      dispatch(setThemeList(themeList));
      currentTheme && changeCurrentTheme(currentTheme);
    });
  });
}

export const useChangeCurrentTheme = () => {
  const dispatch = useAppDispatch();
  return (currentTheme: TSTheme.Item) => {
    dispatch(setCurrentTheme(currentTheme));
    updateAppConfigThemeFile('currentTheme', currentTheme);
    changeCssVars(currentTheme);
  };
};

export function changeCssVars(theme: TSTheme.Item) {
  const { backgroundColor, fontColor, secondaryBackgroundColor } = theme;
  const root = document.documentElement;
  root.style.setProperty('--primary-color', fontColor);
  root.style.setProperty('--primary-background-color', backgroundColor);
  root.style.setProperty(
    '--primary-second-background-color',
    tintColor(backgroundColor, 0.1)
  );
  root.style.setProperty('invert', '0');
}

export function updateAppConfigThemeFile(key: string, value: any) {
  return new Promise((resolve, reject) => {
    getAppPath().then((appPath: string) => {
      const jsonPath = path.join(appPath, 'appConfig/theme.config.json');
      readAppConfigThemeFile().then((theme) => {
        const nextConfig = { ...theme, [key]: value };
        fileAction.canRead(jsonPath).then(() => {
          fileAction.write(jsonPath, nextConfig, 'utf8').then(() => {
            resolve(true);
          });
        });
      });
    });
  });
}

export function readAppConfigThemeFile(): Promise<ThemeStore> {
  console.log(isWeb);
  return new Promise((resolve, reject) => {
    if (isWeb) {
      import('../appConfig/themeConfig.json').then((res) => {
        const { currentTheme, themeList, name } = res;
        resolve({
          currentTheme,
          themeList,
        });
      });
    } else {
      import('@src/utils/appPath').then(({ getAppPath }) => {
        import('@src/utils/file').then(({ default: fileAction }) => {
          import('path').then((path) => {
            getAppPath().then((appPath: string) => {
              const jsonPath = path.join(appPath, 'appConfig/theme.config.json');

              fileAction
                .hasFile(jsonPath)
                .then(async () => {
                  const themeConfigValues = await fileAction.read(jsonPath, 'utf-8');
                  console.log(themeConfigValues);

                  resolve(JSON.parse(themeConfigValues));
                })
                .catch(() => {
                  reject(new Error('appConfig does not exist !'));
                });
            });
          });
        });
      });
    }
  });
}
