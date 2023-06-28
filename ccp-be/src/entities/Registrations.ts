import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Students } from "./Students";
import { Activities } from "./Activities";

@Index("StudentID", ["studentId"], {})
@Index("ActivityID", ["activityId"], {})
@Entity("registrations", { schema: "ccp" })
export class Registrations {
  @PrimaryGeneratedColumn({ type: "int", name: "RegistrationID" })
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
