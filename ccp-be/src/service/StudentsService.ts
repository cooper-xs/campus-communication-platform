import { Context } from "koa";
import { StudentsRepository } from "../config/data-source";

export default class StudentsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async findStudentByEmail(email: string) {
    const student = await StudentsRepository.findOne({
      where: {
        email,
      },
    });
    return student;
  }
}