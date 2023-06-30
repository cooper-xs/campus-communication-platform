import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

export interface MyAxiosConfig extends AxiosRequestConfig {
  method: 'get' | 'post' | 'put' | 'delete';
}

export interface RegisterForm {
  name: string;
  nickname: string;
  email: string;
  password: string;
  grade: number;
  class: string;
  pid: string;
}

export interface LoginForm {
  email: string;
  password: string;
  type: string;
}

export interface NewActivityForm {
  title: string;
  description: string;
  beginTime: Date;
  endTime: Date;
}