import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("post", { schema: "ccp" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("tinyint", { name: "is_top", width: 1, default: () => "'0'" })
  isTop: boolean;

  @Column("tinyint", { name: "is_approved", width: 1, default: () => "'0'" })
  isApproved: boolean;
}
