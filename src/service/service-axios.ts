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

// Define the type for what axios will return after interceptor
// The module declaration is needed here because you're modifying Axios's default behavior
// through the interceptor. When your interceptor returns response.data directly, you're
// changing the shape of what Axios returns. The declare module 'axios' tells TypeScript
// that the AxiosResponse type should now extend Promise<T>, matching your interceptor's
// behavior where responses are unwrapped to their data property directly.

// This type augmentation ensures type safety throughout your application when using the modified Axios responses.
declare module 'axios' {
  export interface AxiosResponse<T = any, D = any> extends Promise<T> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig<D>;
  }
}

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
