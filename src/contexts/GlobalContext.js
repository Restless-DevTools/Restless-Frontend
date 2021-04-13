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

  return (
    <GlobalContext.Provider value={{
      openSuccessNotification,
      openErrorNotification,
      openInfoNotification,
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
