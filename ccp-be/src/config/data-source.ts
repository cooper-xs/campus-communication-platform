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

export const TopRequestsRepository = AppDataSource.getRepository("Toprequests");
export const PostReviewRepository = AppDataSource.getRepository("Postreview");
export const ReplyRepository = AppDataSource.getRepository("Reply");
export const RegistrationsRepository = AppDataSource.getRepository("Registrations");
export const MessagesRepository = AppDataSource.getRepository("Messages");
export const CommentsRepository = AppDataSource.getRepository("Comments");
export const VideosRepository = AppDataSource.getRepository("Videos");
export const PostsRepository = AppDataSource.getRepository("Posts");
export const ActivitiesRepository = AppDataSource.getRepository("Activities");
export const TeachersRepository = AppDataSource.getRepository("Teachers");
export const StudentsRepository = AppDataSource.getRepository("Students");
export const AuthenticationsRepository = AppDataSource.getRepository("Authentications");
export const AdministratorsRepository = AppDataSource.getRepository("Administrators");

