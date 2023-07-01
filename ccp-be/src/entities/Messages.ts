import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Students } from "./Students";

@Index("SenderID", ["senderId"], {})
@Index("RecipientID", ["recipientId"], {})
@Entity("messages", { schema: "ccp" })
export class Messages {
  @PrimaryGeneratedColumn({ type: "int", name: "MessageID" })
  messageId: number;

  @Column("int", { name: "SenderID", nullable: true })
  senderId: number | null;

  @Column("int", { name: "RecipientID", nullable: true })
  recipientId: number | null;

  @Column("varchar", { name: "Content", nullable: true, length: 255 })
  content: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @ManyToOne(() => Students, (students) => students.messages, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "SenderID", referencedColumnName: "studentId" }])
  sender: Students;

  @ManyToOne(() => Students, (students) => students.messages2, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "RecipientID", referencedColumnName: "studentId" }])
  recipient: Students;
}
