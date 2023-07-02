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

  public async findTeacherById(teacherId: number) {
    const teacher = await TeachersRepository.findOne({
      where: { teacherId },
    });
    return teacher;
  }

  public async updateTeacher(teacher: any) {
    const result = await TeachersRepository.save(teacher);
    return result;
  }

  public async findTeacherByPid(pid: number) {
    const teacher = await TeachersRepository.findOne({
      where: { pid },
    });
    return teacher;
  }
}
