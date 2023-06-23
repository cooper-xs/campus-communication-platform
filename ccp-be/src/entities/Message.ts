import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("message", { schema: "ccp" })
export class Message {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "sender_id" })
  senderId: number;

  @Column("int", { name: "receiver_id" })
  receiverId: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
