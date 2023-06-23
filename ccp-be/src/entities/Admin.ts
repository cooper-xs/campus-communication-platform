import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin", { schema: "ccp" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 50 })
  username: string;

  @Column("varchar", { name: "password", length: 50 })
  password: string;
}
