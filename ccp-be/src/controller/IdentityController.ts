import { Context } from "koa";
import AdministratorsService from "../service/AdministratorsService";
import StudentsService from "../service/StudentsService";
import TeacherService from "../service/TeachersService";
import { tool } from "../utils/tool";
import { verifyItems } from "../types";
import AuthenticationsService from "../service/AuthenticationsService";

export default class IdentityController {
  private readonly _administratorsService = new AdministratorsService(this.ctx);
  private readonly _teachersService = new TeacherService(this.ctx);
  private readonly _studentsService = new StudentsService(this.ctx);
  private readonly _authenticationsService = new AuthenticationsService(this.ctx);

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async login() {
    const { email, password, type } = this.ctx.request.body as {
      email: string;
      password: string;
      type: string;
    };

    if (type === "admin") {
      const admin = await this._administratorsService.findAdministratorByEmail(
        email
      );
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
    } else if (type === "student") {
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

  public async register() {
    let {
      email,
      password,
      name,
      nickname,
      grade,
      class: class_,
      pid,
      academy,
    } = this.ctx.request.body as {
      name: string;
      nickname: string;
      email: string;
      password: string;
      grade: number;
      class: string;
      pid: string;
      academy: string;
    };

    grade = tool.toNumber(grade);

    const student = await this._studentsService.findStudentByEmail(email);

    if (student) {
      this.ctx.status = 409;
    }

    const newStudent = await this._studentsService.addStudent({
      name,
      nickName: nickname,
      email,
      password,
      grade,
      class: class_,
      pid,
      academy,
      verified: 0,
    });

    return newStudent;
  }

  public async verify() {
    const { userType, userName, pid, academy } = this.ctx.request.body as verifyItems;

    const flag = await this._authenticationsService.checkVerify({
      userType,
      userName,
      pid,
      academy
    })

    if(flag) {
      if(userType === 'student') {
        const student = await this._studentsService.findStudentByPid(tool.toNumber(pid));
        if(student) {
          student.verified = true;
          await this._studentsService.updateStudent(student);
          return student;
        }
      } else if(userType === 'teacher') {
        const teacher = await this._teachersService.findTeacherByPid(tool.toNumber(pid));
        if(teacher) {
          teacher.verified = true;
          await this._teachersService.updateTeacher(teacher);
          return teacher;
        }
      }
    } else {
      this.ctx.status = 404;
    }

  }

  public async updateProfile() {
    const { userType } = this.ctx.request.body as { userType: string };

    if (userType === "student") {
      let {
        studentId,
        name,
        nickName,
        password,
        grade,
        class: class_,
        pid,
        academy,
        email,
      } = this.ctx.request.body as {
        studentId: string;
        name: string;
        nickName: string;
        password: string;
        email: string;
        grade: number;
        academy: string;
        class: string;
        pid: string;
      };

      grade = tool.toNumber(grade);

      const student = await this._studentsService.findStudentById(
        tool.toNumber(studentId)
      );

      if (student) {
        const student = await this._studentsService.updateStudent({
          studentId,
          name,
          nickName,
          password,
          email,
          grade,
          academy,
          class: class_,
          pid,
        });

        return student;
      } else {
        this.ctx.status = 404;
      }
    } else if (userType === "teacher") {
      let { teacherId, name, nickName, password, email, academy } = this.ctx
        .request.body as {
        teacherId: string;
        name: string;
        nickName: string;
        password: string;
        email: string;
        academy: string;
      };

      const teacher = await this._teachersService.findTeacherById(
        tool.toNumber(teacherId)
      );

      if (teacher) {
        const teacher = await this._teachersService.updateTeacher({
          teacherId,
          name,
          nickName,
          password,
          email,
          academy,
        });

        return teacher;
      } else {
        this.ctx.status = 404;
      }
    } else if (userType === "admin") {
      let { adminId, name, password, email } = this.ctx.request.body as {
        adminId: string;
        name: string;
        password: string;
        email: string;
      };

      const admin = await this._administratorsService.findAdministratorById(
        tool.toNumber(adminId)
      );

      if (admin) {
        const admin = await this._administratorsService.updateAdministrator({
          adminId,
          name,
          password,
          email,
        });

        return admin;
      } else {
        this.ctx.status = 404;
      }
    } else {
      this.ctx.status = 400;
    }
  }

  public async getAdminById() {
    const adminIdt = this.ctx.query.adminId;

    const adminId = tool.toNumber(adminIdt) as number;

    const res = await this._administratorsService.findAdministratorById(adminId);

    return res;
  }
}
