import React, {
  createContext, useContext,
} from 'react';
import Notification from '../components/Notification/Notification';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Notification
  const abrirNotificacaoSucesso = (message, title) => Notification.createNotification('success', message, title);
  const abrirNotificacaoErro = (message, title) => Notification.createNotification('error', message, title);
  const abrirNotificacaoAlerta = (message, title) => Notification.createNotification('warning', message, title);

  return (
    <GlobalContext.Provider value={{
      abrirNotificacaoSucesso,
      abrirNotificacaoErro,
      abrirNotificacaoAlerta,
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
