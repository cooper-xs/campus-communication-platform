import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("student", { schema: "ccp" })
export class Student {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("varchar", { name: "password", length: 50 })
  password: string;
}
