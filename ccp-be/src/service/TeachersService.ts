import { Context } from "koa";
import { TeachersRepository } from "../config/data-source";

export default class TeacherService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async findTeacherByEmail(email: string) {
    const teacher = await TeachersRepository.findOne({
      where: { email },
    });
    return teacher;
  }
}
