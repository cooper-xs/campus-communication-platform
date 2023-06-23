// 任何可以被实例化的类
export type Newable<T = any> = new (...args: any) => T;

export interface IRoute {
  method: string;
  path: string;
  controller: Newable;
  action: string;
  needLogin?: boolean;
}
