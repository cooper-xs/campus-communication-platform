import { Context } from "koa";
import { AuthenticationsRepository } from "../config/data-source";

export default class AuthenticationsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async findAuthenticationsByUserID(userId: number) {
    const authentications = await AuthenticationsRepository.findOne({
      where: {
        userId,
      },
    });
    return authentications;
  }
}