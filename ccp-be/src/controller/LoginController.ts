import { Context } from "koa";
import AdminService from "../service/AdminService";

export default class LoginController {
  private readonly _adminService: AdminService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._adminService = new AdminService(ctx);
  }

  public async login() {
    const { username, password } = this.ctx.request.body;
    this.ctx.info(`login: username=${username}, password=${password}`);
    const result = await this._adminService.login(username, password);
    this.ctx.info(result);
    return result;
  }
}
