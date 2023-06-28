import { Context } from "koa";
import { AdministratorsRepository } from "../config/data-source";

export default class AdministratorsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async findAdministratorByEmail(email: string) {
    const administrator = await AdministratorsRepository.findOne({
      where: { email },
    });
    return administrator;
  }

  public async findAdministratorById(adminId: number) {
    const administrator = await AdministratorsRepository.findOne({
      where: { adminId },
    });
    return administrator;
  }
}
