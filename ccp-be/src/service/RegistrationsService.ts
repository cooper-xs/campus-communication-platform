import { Context } from "koa";
import { RegistrationsRepository } from "../config/data-source";

export default class RegistrationsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async singUpActivity(registration: any) {
    const res = await RegistrationsRepository.save(registration);
    return res;
  }

  public async getSignUpFlag(studentId: string, activityId: string) {
    const res = await RegistrationsRepository.findOne({
      where: {
        studentId,
        activityId,
      },
    });
    return res ? true : false;
  }
}
