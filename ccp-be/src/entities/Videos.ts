import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Teachers } from "./Teachers";
import { Activities } from "./Activities";

@Index("ActivityID", ["activityId"], {})
@Index("TeacherID", ["teacherId"], {})
@Entity("videos", { schema: "ccp" })
export class Videos {
  @Column("int", { primary: true, name: "VideoID" })
  videoId: number;

  @Column("int", { name: "TeacherID", nullable: true })
  teacherId: number | null;

  @Column("int", { name: "ActivityID", nullable: true })
  activityId: number | null;

  @Column("varchar", { name: "VideoPath", nullable: true, length: 255 })
  videoPath: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @ManyToOne(() => Teachers, (teachers) => teachers.videos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "TeacherID", referencedColumnName: "teacherId" }])
  teacher: Teachers;

  @ManyToOne(() => Activities, (activities) => activities.videos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ActivityID", referencedColumnName: "activityId" }])
  activity: Activities;
}
