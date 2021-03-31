import axios from 'axios';

const restlessApi = process.env.REACT_APP_RESTLESS_URL;

export default class Api {
  constructor(token, onError) {
    this.axios = axios.create({
      baseURL: restlessApi,
      headers: {
        Authorization: token,
      },
    });

    this.axios.interceptors.response.use((response) => response, onError);
  }
}
