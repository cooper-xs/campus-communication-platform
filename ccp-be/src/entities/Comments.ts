import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Posts } from "./Posts";
import { Reply } from "./Reply";

@Index("UserID", ["userId"], {})
@Index("PostID", ["postId"], {})
@Entity("comments", { schema: "ccp" })
export class Comments {
  @PrimaryGeneratedColumn({ type: "int", name: "CommentID" })
  commentId: number;

  @Column("varchar", { name: "UserType", nullable: true, length: 255 })
  userType: string | null;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("int", { name: "PostID", nullable: true })
  postId: number | null;

  @Column("varchar", { name: "Content", nullable: true, length: 255 })
  content: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostID", referencedColumnName: "postId" }])
  post: Posts;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];
}
