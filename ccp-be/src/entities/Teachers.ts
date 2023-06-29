import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activities } from "./Activities";
import { Videos } from "./Videos";

@Entity("teachers", { schema: "ccp" })
export class Teachers {
  @PrimaryGeneratedColumn({ type: "int", name: "TeacherID" })
  teacherId: number;

  @Column("varchar", { name: "NickName", length: 255 })
  nickName: string;

  @Column("varchar", { name: "Name", length: 255 })
  name: string;

  @Column("varchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "Password", length: 255 })
  password: string;

  @Column("varchar", { name: "Academy", nullable: true, length: 255 })
  academy: string | null;

  @Column("varchar", { name: "PID", nullable: true, length: 255 })
  pid: string | null;

  @Column("tinyint", { name: "Verified", nullable: true })
  verified: number | null;

  @OneToMany(() => Activities, (activities) => activities.teacher)
  activities: Activities[];

  @OneToMany(() => Videos, (videos) => videos.teacher)
  videos: Videos[];
}
