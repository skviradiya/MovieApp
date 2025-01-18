import { ApiAuthToken, BASE_URL } from '@App/constants/tempEnv';
import axios from 'axios';


axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 5000;


axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  (config) => {

    const token = ApiAuthToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('\n-- URL:',config.url, '\n-- Params',config.params);
    return config;
  },
  (error) => {
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Response Error:', error);

    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Redirect to login or refresh token.');
    }
    return Promise.reject(error.response || error.message);
  }
);

// No need to re-import axios anywhere else now
export default axios;
