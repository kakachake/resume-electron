import { ipcRenderer, IpcRenderer } from 'electron';

export function getAppPath(): Promise<string> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('getRootPath');
    ipcRenderer.on('replyRootPath', function cb(event, arg: string) {
      if (arg) {
        resolve(arg);
      } else {
        reject(new Error('getRootPath failed'));
      }
      ipcRenderer.removeListener('getRootPath', cb);
    });
  });
}

export function getUserDataPath(): Promise<string> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('getUserDataPath');
    ipcRenderer.on('replyUserDataPath', function cb(event, arg: string) {
      if (arg) {
        console.log(arg);

        resolve(arg);
      } else {
        reject(new Error('getUserDataPath failed'));
      }
      ipcRenderer.removeListener('replyUserDataPath', cb);
    });
  });
}
