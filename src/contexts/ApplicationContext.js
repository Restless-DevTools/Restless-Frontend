import axios from 'axios';
import Cookies from 'js-cookie';
import React, {
  createContext, useContext, useEffect,
} from 'react';
import useAuth from './AuthenticationContext';
import Requests from '../config/ApiRequests';

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

  const resInterceptor = api.interceptors.response
    .use(api.interceptors.response, (error) => {
      const { response } = error;

      if (response.status === 401) {
        logout();
        props.history.push('/auth/login');
      }
    });

  const requests = new Requests(api);

  useEffect(() => () => {
    api.interceptors.response.eject(resInterceptor);
  });

  return (
    <ApplicationContext.Provider value={{
      requests,
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
