import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Posts } from "./Posts";
import { Administrators } from "./Administrators";

@Index("PostID", ["postId"], {})
@Index("toprequests_ibfk_2", ["adminId"], {})
@Entity("toprequests", { schema: "ccp" })
export class Toprequests {
  @Column("int", { primary: true, name: "RequestID" })
  requestId: number;

  @Column("int", { name: "PostID", nullable: true })
  postId: number | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("int", { name: "AdminID", nullable: true })
  adminId: number | null;

  @Column("varchar", { name: "State", nullable: true, length: 255 })
  state: string | null;

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
