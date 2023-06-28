import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teachers } from "./Teachers";
import { Registrations } from "./Registrations";
import { Videos } from "./Videos";

@Index("TeacherID", ["teacherId"], {})
@Entity("activities", { schema: "ccp" })
export class Activities {
  @PrimaryGeneratedColumn({ type: "int", name: "ActivityID" })
  activityId: number;

  @Column("int", { name: "TeacherID", nullable: true })
  teacherId: number | null;

  @Column("varchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "Description", nullable: true, length: 255 })
  description: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @Column("datetime", { name: "BeginTime", nullable: true })
  beginTime: Date | null;

  @Column("datetime", { name: "EndTime", nullable: true })
  endTime: Date | null;

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
