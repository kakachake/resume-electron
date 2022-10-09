import { useEffect } from 'react';

export const MESSAGE_EVENT_NAME_MAPS = {
  OPEN_FORM_MODAL: 'OPEN_FORM_MODAL',
};

class Messager {
  send = (eventName: string, payload: any) => {
    console.log('send', eventName, payload);

    document.dispatchEvent(new CustomEvent(eventName, { detail: { payload } }));
  };
  receive = (e: any, messageHandler: (...args: any) => void) => {
    if (messageHandler) {
      console.log('receive', e, messageHandler);

      const payload = e?.detail?.payload;
      messageHandler(payload);
    }
  };
  useOn = (eventName: string, messageHandler: (...args: any) => void) => {
    useEffect(() => {
      console.log('Messager.on', eventName);
      const handler = (e: any) => this.receive(e, messageHandler);
      document.addEventListener(eventName, handler);
      return () => {
        document.removeEventListener(eventName, handler);
      };
    }, []);
  };
}

export default new Messager();
