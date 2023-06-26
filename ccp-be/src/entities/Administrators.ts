import { Column, Entity, OneToMany } from "typeorm";
import { Postmoderation } from "./Postmoderation";
import { Toprequests } from "./Toprequests";

@Entity("administrators", { schema: "ccp" })
export class Administrators {
  @Column("int", { primary: true, name: "AdminID" })
  adminId: number;

  @Column("varchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "Password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "Role", nullable: true, length: 255 })
  role: string | null;

  @OneToMany(() => Postmoderation, (postmoderation) => postmoderation.admin)
  postmoderations: Postmoderation[];

  @OneToMany(() => Toprequests, (toprequests) => toprequests.admin)
  toprequests: Toprequests[];
}
