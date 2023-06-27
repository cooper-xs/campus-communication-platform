import { Context } from "koa";
import AdministratorsService from "../service/AdministratorsService";
import StudentsService from "../service/StudentsService";
import TeacherService from "../service/TeachersService";

export default class LoginController {
  private readonly _administratorsService = new AdministratorsService(this.ctx);
  private readonly _teachersService = new TeacherService(this.ctx);
  private readonly _studentsService = new StudentsService(this.ctx);

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async login() {
    const {
      email,
      password,
      type,
    } = this.ctx.request.body as {
      email: string;
      password: string;
      type: string;
    };

    if (type === "admin") {
      const admin = await this._administratorsService.findAdministratorByEmail(email);
      if (admin) {
        if (admin.password === password) {
          return admin;
        } else {
          this.ctx.status = 401;
        }
      } else {
        this.ctx.status = 404;
      }
    } else if (type === "teacher") {
      const teacher = await this._teachersService.findTeacherByEmail(email);
      if (teacher) {
        if (teacher.password === password) {
          return teacher;
        } else {
          this.ctx.status = 401;
        }
      } else {
        this.ctx.status = 404;
      }
    } else if(type === "student") {
      const student = await this._studentsService.findStudentByEmail(email);
      if (student) {
        if (student.password === password) {
          return student;
        } else {
          this.ctx.status = 401;
        }
      } else {
        this.ctx.status = 404;
      }
    } else {
      this.ctx.status = 400;
    }
    return null;
  }
}
