import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Teachers } from "./Teachers";
import { Registrations } from "./Registrations";
import { Videos } from "./Videos";

@Index("TeacherID", ["teacherId"], {})
@Entity("activities", { schema: "ccp" })
export class Activities {
  @Column("int", { primary: true, name: "ActivityID" })
  activityId: number;

  @Column("int", { name: "TeacherID", nullable: true })
  teacherId: number | null;

  @Column("varchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "Description", nullable: true, length: 255 })
  description: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @Column("int", { name: "VideoID", nullable: true })
  videoId: number | null;

  @ManyToOne(() => Teachers, (teachers) => teachers.activities, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "TeacherID", referencedColumnName: "teacherId" }])
  teacher: Teachers;

  @OneToMany(() => Registrations, (registrations) => registrations.activity)
  registrations: Registrations[];

  @OneToMany(() => Videos, (videos) => videos.activity)
  videos: Videos[];
}
