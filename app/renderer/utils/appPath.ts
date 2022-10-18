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
