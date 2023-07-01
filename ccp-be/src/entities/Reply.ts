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

  @Column("varchar", { name: "ParentReplyNickname", length: 255 })
  parentReplyNickname: string;

  @Column("varchar", { name: "UserType", nullable: true, length: 255 })
  userType: string | null;

  @Column("int", { name: "UserID" })
  userId: number;

  @Column("varchar", { name: "NickName", length: 255 })
  nickName: string;

  @Column("varchar", { name: "Content", length: 255 })
  content: string;

  @Column("datetime", { name: "CreationTime" })
  creationTime: Date;

  @ManyToOne(() => Comments, (comments) => comments.replies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "CommentID", referencedColumnName: "commentId" }])
  comment: Comments;
}
