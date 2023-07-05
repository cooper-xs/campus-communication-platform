import { Comments } from "../entities/Comments";

// 任何可以被实例化的类
export type Newable<T = any> = new (...args: any) => T;

export interface IRoute {
  method: string;
  path: string;
  controller: Newable;
  action: string;
  needLogin?: boolean;
}

export interface updatePost {
  postId?: number;
  userType: string;
  userId: number;
  title: string;
  content: string;
  postImg?: string;
  creationTime?: Date;
  nickName: string;
  state: number;
}

export interface verifyItems {
  userType: string;
  userName: string;
  pid: string;
  academy: string;
}

export interface topRequest {
  requestId?: number;
  postId: number;
  endTime: Date;
  creationTime?: Date;
  userId?: number;
  userType?: string;
  adminId?: number;
  state?: number;
}
