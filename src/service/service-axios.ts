import axios, { AxiosRequestConfig } from 'axios';
import { ApiEndpoint } from './service-api';

const baseURL = import.meta.env.VITE_APP_BACKEND_API;
const THREE_MINUTES = 3 * 60 * 1000;

const getBaseConfig = (endpoint: ApiEndpoint): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL,
    timeout: THREE_MINUTES,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Default to false if requiresAuth is not specified
  if (endpoint.requiresAuth ?? false) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};

// inteceptor to map response data
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const httpClient = {
  get: <T>(endpoint: ApiEndpoint, config: AxiosRequestConfig = {}) => {
    return axios.get<T>(endpoint.url, {
      ...getBaseConfig(endpoint),
      ...config,
    });
  },

  post: <T>(
    endpoint: ApiEndpoint,
    data: any,
    config: AxiosRequestConfig = {},
  ) => {
    return axios.post<T>(endpoint.url, data, {
      ...getBaseConfig(endpoint),
      ...config,
    });
  },

  put: <T>(
    endpoint: ApiEndpoint,
    data: any,
    config: AxiosRequestConfig = {},
  ) => {
    return axios.put<T>(endpoint.url, data, {
      ...getBaseConfig(endpoint),
      ...config,
    });
  },

  patch: <T>(
    endpoint: ApiEndpoint,
    data: any,
    config: AxiosRequestConfig = {},
  ) => {
    return axios.patch<T>(endpoint.url, data, {
      ...getBaseConfig(endpoint),
      ...config,
    });
  },

  delete: <T>(endpoint: ApiEndpoint, config: AxiosRequestConfig = {}) => {
    return axios.delete<T>(endpoint.url, {
      ...getBaseConfig(endpoint),
      ...config,
    });
  },
};

export { httpClient };
