import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Posts } from "./Posts";
import { Administrators } from "./Administrators";

@Index("PostID", ["postId"], {})
@Index("ReviewerID", ["adminId"], {})
@Entity("postmoderation", { schema: "ccp" })
export class Postmoderation {
  @Column("int", { primary: true, name: "ModerationID" })
  moderationId: number;

  @Column("int", { name: "PostID", nullable: true })
  postId: number | null;

  @Column("int", { name: "AdminID", nullable: true })
  adminId: number | null;

  @Column("varchar", { name: "ModerationStatus", nullable: true, length: 255 })
  moderationStatus: string | null;

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
