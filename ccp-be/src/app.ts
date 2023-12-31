import "reflect-metadata";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import router from "./routes";
import routerResponse from "./utils/routerResponse";
// import static_serve from 'koa-static';
import { AppDataSource } from "./config/data-source";
import { loggerMount } from "./utils/winstonLogger";
// import errorHandler from './utils/errorHandler';
import session from "koa-session";

async function start() {
  const app = new Koa();
  const host = "localhost";
  const port_fe = 8888;
  const port_be = 3333;

  app.use(cors({ origin: `http://localhost:${port_fe}` }));
  // app.use(static_serve(__dirname + '/assets'));
  app.use(bodyParser());
  app.use(loggerMount());
  // app.use(errorHandler);
  app.use(routerResponse);
  app.use(router.routes()).use(router.allowedMethods());
  app.keys = ["lightblogkey", "adminkey", "mykey"];
  app.use(
    session(
      {
        key: "koa:sess", // cookie key
        maxAge: 7 * 24 * 60 * 1000, // 有效期为7天
      },
      app
    )
  );

  app.listen(port_be, () => {
    console.log(`校园交流平台-后端 运行在 http://${host}:${port_be}`);
  });
}

// 引导程序bootstrap
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    await start();
  } catch (error) {
    console.error("Run Error: ", error);
  }
}

bootstrap();
