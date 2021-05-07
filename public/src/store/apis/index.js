import Axios from 'axios';

export const BASE_URL = '/';

export default () => {
  if (Axios.defaults.baseURL === BASE_URL) return;
  Axios.defaults.baseURL = BASE_URL;
  Axios.interceptors.request.use(async (config) => {
    // * handle form data
    if (config.data instanceof FormData) {
      Object.assign(config.headers);
      config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('KANBAN_USER_TOKEN')}` };
    } else {
      // * handle other requests
      let data = {
        ...config.data,
      };
      config.data = data;
      config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('KANBAN_USER_TOKEN')}` };
    }
    return config;
  });
  // * filter data from response
  Axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
