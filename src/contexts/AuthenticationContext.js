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

  const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const githubRedirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
  const githubAuthorizeApi = `https://github.com/login/oauth/authorize?scope=user&client_id=${githubClientId}&redirect_uri=${githubRedirectUri}`;

  // Utils

  const validatePasswordStrenght = (text) => {
    let passwordStrenghtValue = 0;

    if ((text.length >= 4) && (text.length <= 7)) {
      passwordStrenghtValue += 10;
    } else if (text.length > 7) {
      passwordStrenghtValue += 25;
    }

    if (text.match(/[a-z]+/)) {
      passwordStrenghtValue += 10;
    }

    if (text.match(/[A-Z]+/)) {
      passwordStrenghtValue += 20;
    }

    if (text.match(/\d+/)) {
      passwordStrenghtValue += 20;
    }

    if (text.match(/\W+/)) {
      passwordStrenghtValue += 25;
    }

    const passwordStrenghtObject = {};

    if (passwordStrenghtValue < 30) {
      passwordStrenghtObject.label = 'weak';
      passwordStrenghtObject.color = 'text-danger';
    } else if ((passwordStrenghtValue >= 30) && (passwordStrenghtValue < 60)) {
      passwordStrenghtObject.label = 'medium';
      passwordStrenghtObject.color = 'text-warning';
    } else if ((passwordStrenghtValue >= 60) && (passwordStrenghtValue < 85)) {
      passwordStrenghtObject.label = 'strong';
      passwordStrenghtObject.color = 'text-primary';
    } else if (passwordStrenghtValue >= 85) {
      passwordStrenghtObject.label = 'excellent';
      passwordStrenghtObject.color = 'text-success';
    }

    if (passwordStrenghtValue >= 85) {
      return { ...passwordStrenghtObject, isPasswordStrong: true };
    }

    return { ...passwordStrenghtObject, isPasswordStrong: false };
  };

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
    Cookies.remove('FULLNAME');
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
      Cookies.set('FULLNAME', data.user.name);

      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  // Login with github

  const githubLoginRequest = (code) => axios.post(`${restlessApi}/auth/github-login`, { code });

  const githubLogin = async (code) => {
    try {
      const { data } = await githubLoginRequest(code);

      if (!data.status && !data.user) {
        return { isValid: false, message: data.message };
      }

      clearOldCookies();
      Cookies.set('TOKEN', data.token);
      Cookies.set('FULLNAME', data.user.name);

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

  // Request Recover Password

  const requestRecoverPasswordRequest = (userData) => axios.post(`${restlessApi}/auth/request-recover-password`, userData);

  const requestRecoverPassword = async (userData) => {
    try {
      const { data } = await requestRecoverPasswordRequest(userData);

      return { isValid: true, message: data.message };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  // Recover Password

  const recoverPasswordRequest = (userData) => axios.post(`${restlessApi}/auth/recover-password`, userData);

  const recoverPassword = async (userData) => {
    try {
      const { data } = await recoverPasswordRequest(userData);

      if (!data.status) {
        return { isValid: false, message: 'User not found or confirmation code invalid!' };
      }

      return { isValid: true, message: 'Password updated. You can sign in now.' };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  // State control

  useEffect(async () => {
    if (token) {
      const { isValid } = await validateToken();

      if (isValid) {
        setSigned(true);
      }
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{
      signed,
      githubAuthorizeApi,

      // Utils

      validatePasswordStrenght,

      // Requests

      login,
      githubLogin,
      logout,
      register,
      requestRecoverPassword,
      recoverPassword,
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
