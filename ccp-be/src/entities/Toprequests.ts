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
@Index("toprequests_ibfk_2", ["adminId"], {})
@Entity("toprequests", { schema: "ccp" })
export class Toprequests {
  @PrimaryGeneratedColumn({ type: "int", name: "RequestID" })
  requestId: number;

  @Column("int", { name: "PostID", nullable: true })
  postId: number | null;

  @Column("datetime", { name: "EndTime", nullable: true })
  endTime: Date | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "UserType", nullable: true, length: 255 })
  userType: string | null;

  @Column("int", { name: "AdminID", nullable: true })
  adminId: number | null;

  @Column("tinyint", {
    name: "State",
    nullable: true,
    comment: "0: 待批准, 1: 已批准, 2: 已否决",
  })
  state: number | null;

  @ManyToOne(() => Posts, (posts) => posts.toprequests, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostID", referencedColumnName: "postId" }])
  post: Posts;

  @ManyToOne(
    () => Administrators,
    (administrators) => administrators.toprequests,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "AdminID", referencedColumnName: "adminId" }])
  admin: Administrators;
}
