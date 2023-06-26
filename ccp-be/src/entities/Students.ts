import { Column, Entity, OneToMany } from "typeorm";
import { Comments } from "./Comments";
import { Messages } from "./Messages";
import { Posts } from "./Posts";
import { Registrations } from "./Registrations";

@Entity("students", { schema: "ccp" })
export class Students {
  @Column("int", { primary: true, name: "StudentID" })
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

  @Column("varchar", { name: "Class", nullable: true, length: 255 })
  class: string | null;

  @Column("varchar", { name: "PID", nullable: true, length: 255 })
  pid: string | null;

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Messages, (messages) => messages.sender)
  messages: Messages[];

  @OneToMany(() => Messages, (messages) => messages.recipient)
  messages2: Messages[];

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];

  @OneToMany(() => Registrations, (registrations) => registrations.student)
  registrations: Registrations[];
}
