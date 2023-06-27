import { Context } from "koa";
import { Students } from "../entities/Students";
import { StudentsRepository, TeachersRepository } from "../config/data-source";

export default class UserService {
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

  public async findTeacherByEmail(email: string) {
    const teacher = await TeachersRepository.findOne({
      where: {
        email,
      },
    });
    return teacher;
  }

  public async studentLogin(email: string, password: string) {
    const student = await StudentsRepository.findOne({
      where: {
        email,
      },
    });
    if (student) {
      if (student.password === password) {
        return student;
      } else {
        return;
      }
    }
    return true;
  }
}
