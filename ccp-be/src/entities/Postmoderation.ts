import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Posts } from "./Posts";
import { Administrators } from "./Administrators";

@Index("PostID", ["postId"], {})
@Index("ReviewerID", ["adminId"], {})
@Entity("postmoderation", { schema: "ccp" })
export class Postmoderation {
  @PrimaryGeneratedColumn({ type: "int", name: "ModerationID" })
  moderationId: number;

  @Column("int", { name: "PostID", nullable: true })
  postId: number | null;

  @Column("int", { name: "AdminID", nullable: true })
  adminId: number | null;

  @Column("tinyint", {
    name: "ModerationStatus",
    nullable: true,
    comment: "0: 审核为通过状态, 1: 审核为不通过状态, 2: 修改为待审核状态",
    width: 1,
  })
  moderationStatus: boolean | null;

  @Column("datetime", { name: "ModerationTime", nullable: true })
  moderationTime: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.postmoderations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostID", referencedColumnName: "postId" }])
  post: Posts;

  @ManyToOne(
    () => Administrators,
    (administrators) => administrators.postmoderations,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "AdminID", referencedColumnName: "adminId" }])
  admin: Administrators;
}
