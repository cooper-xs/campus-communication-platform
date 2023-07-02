import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postreview } from "./Postreview";
import { Toprequests } from "./Toprequests";

@Entity("administrators", { schema: "ccp" })
export class Administrators {
  @PrimaryGeneratedColumn({ type: "int", name: "AdminID" })
  adminId: number;

  @Column("varchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "Password", nullable: true, length: 255 })
  password: string | null;

  @OneToMany(() => Postreview, (postreview) => postreview.admin)
  postreviews: Postreview[];

  @OneToMany(() => Toprequests, (toprequests) => toprequests.admin)
  toprequests: Toprequests[];
}
