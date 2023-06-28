import { Context } from "koa";
import StudentsService from "../service/StudentsService";

export default class StudentController {
  private readonly _studentService: StudentsService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._studentService = new StudentsService(this.ctx);
  }

  public async findStudentById() {
    const studentId = this.ctx.query.studentId;
    const student = await this._studentService.findStudentById(studentId as any);
    return student;
  }
}
