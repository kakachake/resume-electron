import { dialog, ipcMain, app } from 'electron';
const path = require('path');
function isDev() {
  // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
  return process.env.NODE_ENV === 'development';
}
const ROOT_PATH = path.join(app.getAppPath(), '../');
ipcMain.on('open-save-resume-path', (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((resule) => {
      event.reply('reply-save-resume-path', resule.filePaths);
    })
    .catch((err) => {
      event.reply('reply-save-resume-path', err);
    });
});
ipcMain.on('getRootPath', (event, arg) => {
  console.log(__dirname);
  console.log(ROOT_PATH);

  event.reply('replyRootPath', isDev() ? ROOT_PATH : __dirname);
});
