import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Registrations } from "./Registrations";

@Entity("students", { schema: "ccp" })
export class Students {
  @PrimaryGeneratedColumn({ type: "int", name: "StudentID" })
  studentId: number;

  @Column("varchar", { name: "NickName", length: 255 })
  nickName: string;

  @Column("varchar", { name: "Name", length: 255 })
  name: string;

  @Column("varchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "Password", length: 255 })
  password: string;

  @Column("int", { name: "Grade", nullable: true })
  grade: number | null;

  @Column("varchar", { name: "Academy", nullable: true, length: 255 })
  academy: string | null;

  @Column("varchar", { name: "Class", nullable: true, length: 255 })
  class: string | null;

  @Column("varchar", { name: "PID", nullable: true, length: 255 })
  pid: string | null;

  @Column("tinyint", {
    name: "Verified",
    nullable: true,
    comment: " 0: 未认证, 1:认证通过",
    width: 1,
  })
  verified: boolean | null;

  @OneToMany(() => Registrations, (registrations) => registrations.student)
  registrations: Registrations[];
}
