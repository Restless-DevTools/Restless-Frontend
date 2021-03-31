import React from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

class Notification extends React.Component {
  static createNotification = (type, message, title) => {
    switch (type) {
      case 'info':
        NotificationManager.info(message || '',
          title || 'Informação', 6000);
        break;
      case 'success':
        NotificationManager.success(message || 'Operação realizada!',
          title || 'Sucesso', 5000);
        break;
      case 'warning':
        NotificationManager.warning(message || '',
          title || 'Atenção!', 6000);
        break;
      case 'error':
        NotificationManager.error(message || '',
          title || '', 6000);
        break;

      default:
        NotificationManager.warning(message || '',
          title || 'Atenção', 6000);
    }
  };

  render() {
    return (
      <></>
    );
  }
}

export default Notification;
