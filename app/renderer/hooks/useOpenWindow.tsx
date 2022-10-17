import { useRef } from 'react';

export const useOpenWindow = () => {
  const openWindow = useRef<Function>();
  if (process.env.target === 'web') {
    openWindow.current = (url: string) => {
      window.open(url);
    };
  } else {
    import('electron').then((electron) => {
      openWindow.current = (url: string) => {
        electron.shell.openExternal(url);
      };
    });
  }
  return openWindow;
};
