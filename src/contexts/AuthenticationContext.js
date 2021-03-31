import Cookies from 'js-cookie';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import Notification from '../components/Notification/Notification';

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const restlessApi = process.env.REACT_APP_RESTLESS_URL;
  const token = Cookies.get('TOKEN');

  // utils

  const abrirNotificacaoSucesso = (message, title) => Notification.createNotification('success', message, title);
  const abrirNotificacaoErro = (message, title) => Notification.createNotification('error', message, title);
  const abrirNotificacaoAlerta = (message, title) => Notification.createNotification('warning', message, title);

  const clearOldCookies = () => {
    Cookies.remove('TOKEN');
    Cookies.remove('USERNAME');
  };

  // logout

  const logout = () => {
    clearOldCookies();
    setSigned(false);
  };

  // login

  const loginRequest = (username, password) => axios.post(`${restlessApi}/auth/login`, { username, password });

  const login = async (username, password) => {
    try {
      const { data } = await loginRequest(username, password);

      if (!data.status && !data.user) {
        return { isValid: false, message: data.message };
      }

      clearOldCookies();
      Cookies.set('TOKEN', data.token);
      Cookies.set('USERNAME', username);

      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  // register

  const registerRequest = (userData) => axios.post(`${restlessApi}/users/create`, userData);

  const register = async (userData) => {
    try {
      const { data } = await registerRequest(userData);

      if (!data.status && !data.id) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  useEffect(() => {
    if (token) {
      setSigned(true);
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{
      signed,

      abrirNotificacaoSucesso,
      abrirNotificacaoErro,
      abrirNotificacaoAlerta,

      login,
      logout,
      register,
    }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthenticationContext);

  return context;
}
