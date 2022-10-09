import { FC } from 'react';
import styles from './Message.module.less';

interface IMessageProps {
  message: string;
}

const Message: FC<IMessageProps> = ({ message }) => {
  return <div className={styles.message}>{message}</div>;
};

export default Message;
