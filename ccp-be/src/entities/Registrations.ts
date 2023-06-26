import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Students } from "./Students";
import { Activities } from "./Activities";

@Index("ActivityID", ["activityId"], {})
@Index("StudentID", ["studentId"], {})
@Entity("registrations", { schema: "ccp" })
export class Registrations {
  @Column("int", { primary: true, name: "RegistrationID" })
  registrationId: number;

  @Column("int", { name: "StudentID", nullable: true })
  studentId: number | null;

  @Column("int", { name: "ActivityID", nullable: true })
  activityId: number | null;

  @Column("datetime", { name: "RegistrationTime", nullable: true })
  registrationTime: Date | null;

  @ManyToOne(() => Students, (students) => students.registrations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "StudentID", referencedColumnName: "studentId" }])
  student: Students;

  @ManyToOne(() => Activities, (activities) => activities.registrations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ActivityID", referencedColumnName: "activityId" }])
  activity: Activities;
}
