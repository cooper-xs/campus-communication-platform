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
  beginTime: Date | null;
  endTime: Date | null;
}

export interface post {
  postId: string;
  userType: string;
  userId: string;
  title:  string;
  content: string;
  postImg: string;
  creationTime: Date;
  state: number;
  nickName: string;
  isTop: boolean;
}

export interface comment {
  commentId: string;
  userType: string;
  userId: string;
  postId: string;
  content: string;
  creationTime: Date;
  nickName: string;
  replys: reply[];
}

export interface reply {
  replyId: string;
  commentId: string;
  parentReplyNickname: string;
  userType: string;
  userId: string;
  nickName: string;
  content: string;
  creationTime: Date;
}

