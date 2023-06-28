import { Context } from "koa";
import TeacherService from "../service/TeachersService";

export default class TeacherController {
  private readonly _teachersService = new TeacherService(this.ctx);

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async findTeacherById() {
    let teacherId = this.ctx.query.teacherId;
    if (teacherId) {
      const teacher = await this._teachersService.findTeacherById(teacherId as any);
      return teacher;
    } else {
      this.ctx.status = 400;
    }
  }
}