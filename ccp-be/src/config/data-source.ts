import "reflect-metadata";
import { DataSource } from "typeorm";
import { DATASOURCE } from "../config";

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DATASOURCE.host,
  port: DATASOURCE.port,
  username: DATASOURCE.username,
  password: DATASOURCE.password,
  database: DATASOURCE.database,
  synchronize: DATASOURCE.synchronize,
  entities: [isProd ? "dist/entities/*.js" : "src/entities/*.ts"],
  migrations: [
    // "src/migrations/*.ts"
  ],
  subscribers: [
    // "src/subscribers/*.ts"
  ],
});
