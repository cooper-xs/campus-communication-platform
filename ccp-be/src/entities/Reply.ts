import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./Comments";

@Index("comment", ["commentId"], {})
@Entity("reply", { schema: "ccp" })
export class Reply {
  @PrimaryGeneratedColumn({ type: "int", name: "ReplyID" })
  replyId: number;

  @Column("int", { name: "CommentID" })
  commentId: number;

  @Column("int", { name: "UserID" })
  userId: number;

  @Column("varchar", { name: "Content", length: 255 })
  content: string;

  @Column("datetime", { name: "CreationTime" })
  creationTime: Date;

  @Column("varchar", { name: "UserNickname", nullable: true, length: 255 })
  userNickname: string | null;

  @ManyToOne(() => Comments, (comments) => comments.replies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "CommentID", referencedColumnName: "commentId" }])
  comment: Comments;
}
