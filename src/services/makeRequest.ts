import Axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_PATHS, BASE_URL } from './api';
import { CustomerStateType } from '~types';
import { getStoredValue, storeValue } from '~helpers';
import { store } from '../redux/store';

type AxiosRequestConfigWithRetry = AxiosRequestConfig & {
  _retry?: boolean;
  userData: CustomerStateType;
};
const api = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 404 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = (await getStoredValue('userCredentials')).refresh;
      // Make a request to refresh the token
      return api({
        url: API_PATHS['refresh-token'],
        method: 'POST',
        data: { refresh_token: refreshToken },
      }).then(async (response: AxiosResponse) => {
        if (response.status === 200) {
          // save new tokens to SecureStore
          const credentials = {
            ...originalRequest.userData,
            access: response.data.access,
            refresh: response.data.refresh,
          };
          await storeValue('userCredentials', credentials);
          // Modify the original request's headers with the new access token
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${response.data.access}`;
          // Repeat the original request
          return api(originalRequest);
        }
      });
    }
    // If the error is not 401 or refreshing the token failed, reject the original request
    return Promise.reject(error);
  }
);

export const makeRequest = async (
  url: string,
  options: AxiosRequestConfig
): Promise<any> => {
  // if the url is login or register, do not add the Authorization header
  let headers = {};
  if (!(url.includes(API_PATHS.login) || url.includes(API_PATHS.register))) {
    headers = {
      Authorization: `Bearer ${
        store.getState().customer.authenticated
          ? store.getState().customer.customer.access
          : store.getState().manager.authenticated &&
            store.getState().manager.manager.access
      }`,
      ...options.headers,
    };
  }
  return api(url, {
    headers,
    ...options,
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.error(
        `Error in Make Request: ${url}`,
        error.response.data ?? error
      );
      throw error.response.data ?? 'Error in Make Request';
    });
};
