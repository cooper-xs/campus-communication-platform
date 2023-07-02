import { Context } from "koa";
import { StudentsRepository } from "../config/data-source";
import { Students } from "../entities/Students";

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

  public async addStudent(student: any) {
    const result = await StudentsRepository.save(student);
    return result;
  }

  public async findStudentById(studentId: number) {
    const student = await StudentsRepository.findOne({
      where: {
        studentId,
      },
    });
    return student;
  }

  public async updateStudent(student: any) {
    const result = await StudentsRepository.save(student);
    return result;
  }

  public async findStudentByPid(pid: number) {
    const student = await StudentsRepository.findOne({
      where: {
        pid,
      },
    });
    return student;
  }
}