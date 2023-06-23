import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("activity_registration", { schema: "ccp" })
export class ActivityRegistration {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "activity_id" })
  activityId: number;

  @Column("int", { name: "student_id" })
  studentId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
