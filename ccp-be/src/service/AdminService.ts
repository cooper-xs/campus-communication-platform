import { Context } from 'koa';

export default class AdminService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async login(username: string, password: string) {
    return true;
  }
}