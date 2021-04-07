import axios from 'axios';
import Cookies from 'js-cookie';
import React, {
  createContext, useContext, useEffect,
} from 'react';
import useAuth from './AuthenticationContext';
import Requests from '../config/Requests';

const restlessApi = process.env.REACT_APP_RESTLESS_URL;
const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
  const { logout } = useAuth();
  const token = Cookies.get('TOKEN');
  const api = axios.create({
    baseURL: restlessApi,
    headers: {
      Authorization: token,
    },
  });
  const requests = new Requests(api);

  // Collections

  const createCollection = async (userData) => {
    try {
      const { data } = await requests.createCollection(userData);

      if (!data.status && !data.id) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  useEffect(() => {
    const resInterceptor = api.interceptors.response
      .use(api.interceptors.response, (error) => {
        const { response } = error;

        if (response.status === 401) {
          logout();
          props.history.push('/auth/login');
        }
      });

    return () => {
      api.interceptors.response.eject(resInterceptor);
    };
  }, [api.interceptors.response]);

  return (
    <ApplicationContext.Provider value={{
      requests,

      // Collections
      createCollection,
    }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default function useApp() {
  const context = useContext(ApplicationContext);

  return context;
}
