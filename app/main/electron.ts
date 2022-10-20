const path = require('path');
require('./eventCatch');
const { app, ipcMain } = require('electron');
import { BrowserWindow } from 'electron';
const ROOT_PATH = path.join(app.getAppPath(), '../');
import { Menu } from 'electron';
import { customMenu } from './customMenu';
import './userData';
function isDev() {
  // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
  return process.env.NODE_ENV === 'development';
}
export interface MyBrowserWindow extends BrowserWindow {
  uid?: string;
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,

    webPreferences: {
      devTools: isDev(),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  const settingWindow: MyBrowserWindow = new BrowserWindow({
    width: 720,
    height: 240,
    show: false,
    resizable: true,

    webPreferences: { devTools: true, nodeIntegration: true, contextIsolation: false },
  });
  settingWindow.uid = 'settingWindow'; // 添加自己唯一的窗口属性
  settingWindow.on('close', async (e) => {
    settingWindow.hide(); // 隐藏窗口
    e.preventDefault();
    e.returnValue = false;
  });
  if (isDev()) {
    mainWindow.loadURL(`http://127.0.0.1:7001/index.html`);
    settingWindow.loadURL(`http://127.0.0.1:7001/setting.html`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    settingWindow.loadURL(`file://${path.join(__dirname, '../dist/setting.html')}`);
  }
  const menu = Menu.buildFromTemplate(customMenu);
  mainWindow.setMenu(menu);
  settingWindow.setMenu(menu);
  mainWindow.on('close', () => {
    app.exit();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  app.quit();
});
