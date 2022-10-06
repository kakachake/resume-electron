const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const ROOT_PATH = path.join(app.getAppPath(), '../');

function isDev() {
  // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
  return process.env.NODE_ENV === 'development';
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (isDev()) {
    mainWindow.loadURL(`http://127.0.0.1:7001/#/`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on('getRootPath', (event, arg) => {
  event.reply('replyRootPath', ROOT_PATH);
});
