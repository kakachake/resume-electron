import { dialog, ipcMain } from 'electron';

ipcMain.on('open-save-resume-path', (event, arg) => {
  console.log('open-save-resume-path');

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
