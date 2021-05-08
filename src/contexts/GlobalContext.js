import React, {
  createContext, useContext,
} from 'react';
import Notification from '../components/Notification/Notification';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Notification
  const openSuccessNotification = (message, title) => Notification.createNotification('success', message, title);
  const openErrorNotification = (message, title) => Notification.createNotification('error', message, title);
  const openInfoNotification = (message, title) => Notification.createNotification('warning', message, title);

  // HTTP status code compilerOptions
  const getHttpStatusColor = (code) => {
    if (code === 301) {
      return '#31C183';
    }

    if (code === 200) {
      return '#B0DC64';
    }

    if (code.toString().startsWith('5')) {
      return '#FACF53';
    }

    if (code === 404) {
      return '#F95053';
    }

    if (code.toString().startsWith('3')) {
      return '#7268B8';
    }

    if (code.toString().startsWith('4')) {
      return '#FB8A5E';
    }
  };

  return (
    <GlobalContext.Provider value={{
      openSuccessNotification,
      openErrorNotification,
      openInfoNotification,

      getHttpStatusColor,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default function useGlobal() {
  const context = useContext(GlobalContext);

  return context;
}
