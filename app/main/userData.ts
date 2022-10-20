import { app, ipcMain } from 'electron';
import path from 'path';
import fileAction from '@src/utils/file';

const appConfigPath = path.resolve(app.getPath('userData'), 'appConfig');

fileAction
  .canRead(appConfigPath)
  .then(() => {
    fileAction.hasFile(path.resolve(appConfigPath, 'theme.config.json')).catch(() => {
      createThemeConfigJson();
    });
    fileAction.hasFile(path.resolve(appConfigPath, 'global.config.json')).catch(() => {
      createGlobalConfigJson();
    });
  })
  .catch(() => {
    fileAction.mkdirDir(appConfigPath).then(() => {
      createThemeConfigJson();
      createGlobalConfigJson();
    });
  });

const createThemeConfigJson = () => {
  fileAction.write(path.resolve(appConfigPath, 'theme.config.json'), {
    name: '主题配置表',
    themeList: [
      {
        id: 'dark',
        fontColor: '#ffffff',
        backgroundColor: '#27292c',
        secondaryBackgroundColor: '#3a3f51',
        invert: '0',
      },
      { id: 'red', fontColor: '#ffffff', backgroundColor: '#864c52', invert: '0' },
      {
        id: 'blue',
        fontColor: '#ffffff',
        backgroundColor: '#35495e',
        secondaryBackgroundColor: '#3a3f51',
        invert: '0',
      },
      {
        id: 'green',
        fontColor: '#ffffff',
        backgroundColor: '#247e65',
        secondaryBackgroundColor: '#3a3f51',
        invert: '0',
      },
      {
        id: 'purple',
        fontColor: '#ffffff',
        backgroundColor: '#c3a9be',
        secondaryBackgroundColor: '#3a3f51',
        invert: '0',
      },
      {
        id: 'princess',
        fontColor: '#ffffff',
        backgroundColor: '#945454',
        secondaryBackgroundColor: '#3a3f51',
        invert: '0',
      },
    ],
    currentTheme: {
      id: 'dark',
      fontColor: '#ffffff',
      backgroundColor: '#27292c',
      secondaryBackgroundColor: '#3a3f51',
      invert: '0',
    },
  });
};

const createGlobalConfigJson = () => {
  fileAction?.write(
    `${appConfigPath}/global.config.json`,
    { name: '全局配置表', resumeSavePath: '' },
    'utf8'
  );
};

ipcMain.on('getUserDataPath', (event, arg) => {
  event.reply('replyUserDataPath', app.getPath('userData'));
});
