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
@Entity("postreview", { schema: "ccp" })
export class Postreview {
  @PrimaryGeneratedColumn({ type: "int", name: "ReviewID" })
  reviewId: number;

  @Column("int", { name: "PostID", nullable: true })
  postId: number | null;

  @Column("int", { name: "AdminID", nullable: true })
  adminId: number | null;

  @Column("tinyint", {
    name: "Status",
    nullable: true,
    comment: "0: 审核为通过状态, 1: 审核为不通过状态, 2: 修改为待审核状态",
    width: 1,
  })
  status: boolean | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.postreviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostID", referencedColumnName: "postId" }])
  post: Posts;

  @ManyToOne(
    () => Administrators,
    (administrators) => administrators.postreviews,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "AdminID", referencedColumnName: "adminId" }])
  admin: Administrators;
}
