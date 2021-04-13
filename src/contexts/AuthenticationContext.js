import axios from 'axios';
import Cookies from 'js-cookie';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const restlessApi = process.env.REACT_APP_RESTLESS_URL;
  const token = Cookies.get('TOKEN');

  // Validate token

  const validateTokenRequest = () => axios.post(`${restlessApi}/auth/validate-token`, { token });

  const validateToken = async () => {
    try {
      const { data } = await validateTokenRequest();

      if (!data.user) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true };
    } catch (error) {
      if (error && error.response) {
        return { isValid: false, message: error.response.data.message };
      }
      return { isValid: false, message: 'Something went wrong' };
    }
  };

  // logout
  const clearOldCookies = () => {
    Cookies.remove('TOKEN');
    Cookies.remove('USERNAME');
  };

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
    const validateTokenAsync = async () => {
      const validateTokenInfo = await validateToken();

      return validateTokenInfo;
    };

    if (token) {
      const { isValid } = validateTokenAsync();

      if (isValid) {
        setSigned(true);
      }
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{
      signed,

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
