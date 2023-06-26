import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Comments } from "./Comments";
import { Postmoderation } from "./Postmoderation";
import { Students } from "./Students";
import { Toprequests } from "./Toprequests";

@Index("UserID", ["userId"], {})
@Entity("posts", { schema: "ccp" })
export class Posts {
  @Column("int", { primary: true, name: "PostID" })
  postId: number;

  @Column("int", { name: "UserID", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "Content", nullable: true, length: 255 })
  content: string | null;

  @Column("datetime", { name: "CreationTime", nullable: true })
  creationTime: Date | null;

  @Column("tinyint", { name: "PinnedState", nullable: true, width: 1 })
  pinnedState: boolean | null;

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
