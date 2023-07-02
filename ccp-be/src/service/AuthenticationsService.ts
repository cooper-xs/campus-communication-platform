import { Context } from "koa";
import { AuthenticationsRepository } from "../config/data-source";
import { verifyItems } from "../types";

export default class AuthenticationsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async checkVerify(indetity: verifyItems) {
    const { userName, userType, pid, academy } = indetity;
    const authentication = await AuthenticationsRepository.findOne({
      where: { userName, userType, pid, academy },
    });
    if (authentication) {
      return true;
    } else {
      return false;
    }
  }
}
