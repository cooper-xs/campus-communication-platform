import { Column, Entity } from "typeorm";

@Entity("authentications", { schema: "ccp" })
export class Authentications {
  @Column("int", { primary: true, name: "UserID" })
  userId: number;

  @Column("varchar", { name: "UserName", nullable: true, length: 255 })
  userName: string | null;

  @Column("varchar", { name: "PID", nullable: true, length: 18 })
  pid: string | null;

  @Column("varchar", { name: "UserType", nullable: true, length: 255 })
  userType: string | null;
}
