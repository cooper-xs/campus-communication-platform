import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./Comments";
import { Postmoderation } from "./Postmoderation";
import { Students } from "./Students";
import { Toprequests } from "./Toprequests";

@Index("UserID", ["userId"], {})
@Entity("posts", { schema: "ccp" })
export class Posts {
  @PrimaryGeneratedColumn({ type: "int", name: "PostID" })
  postId: number;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "Content", nullable: true, length: 255 })
  content: string | null;

  @Column("varchar", { name: "Post_img", nullable: true, length: 255 })
  postImg: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @Column("tinyint", {
    name: "State",
    nullable: true,
    comment:
      "0: 直接通过, 1: 需要审核, 2:审核已通过, 3:审核未通过, 4:草稿未发布",
    width: 1,
  })
  state: boolean | null;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @OneToMany(() => Postmoderation, (postmoderation) => postmoderation.post)
  postmoderations: Postmoderation[];

  @ManyToOne(() => Students, (students) => students.posts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserID", referencedColumnName: "studentId" }])
  user: Students;

  @OneToMany(() => Toprequests, (toprequests) => toprequests.post)
  toprequests: Toprequests[];
}
