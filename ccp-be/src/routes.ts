import Router from '@koa/router';
import { Context, Next } from 'koa';
import LoginController from './controller/LoginController';
import { IRoute } from './types';

const routes: IRoute[] = [
  {
    method: 'post',
    path: '/login',
    controller: LoginController,
    action: 'login',
  },
];

const router = new Router();

routes.forEach((route) => {
  const middlewares = [];
  router[route.method](route.path, ...middlewares, async (ctx: Context) => {
    // eslint-disable-next-line new-cap
    const controller = new route.controller(ctx);
    return await controller[route.action]();
  });
});

export default router;
