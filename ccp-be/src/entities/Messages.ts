import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Students } from "./Students";

@Index("RecipientID", ["recipientId"], {})
@Index("SenderID", ["senderId"], {})
@Entity("messages", { schema: "ccp" })
export class Messages {
  @Column("int", { primary: true, name: "MessageID" })
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
