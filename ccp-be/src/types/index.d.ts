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

declare namespace KoaMulter {
  interface File {
    filename: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
  }
}

declare module 'koa' {
  interface Request {
    file: KoaMulter.File;
    files: KoaMulter.File[];
  }
}

export interface newPost {
  userId: number;
  title: string;
  content: string;
  pinnedState?: number;
  creationTime?: Date;
}