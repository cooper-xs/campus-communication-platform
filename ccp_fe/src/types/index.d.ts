import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

export interface MyAxiosConfig extends AxiosRequestConfig {
  method: 'get' | 'post' | 'put' | 'delete';
}
