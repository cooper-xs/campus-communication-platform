import Router from '@koa/router';
import { Context, Next } from 'koa';
import LoginController from './controller/LoginController';
import PostController from './controller/PostController'
import { IRoute } from './types';

const routes: IRoute[] = [
  {
    method: 'post',
    path: '/login',
    controller: LoginController,
    action: 'login',
  },
  {
    method: 'post',
    path: '/addPost',
    controller: PostController,
    action: 'addPost',
    // needLogin: true,
  },
  {
    method: 'post',
    path: '/reviewPost',
    controller: PostController,
    action: 'reviewPost',
  },
  {
    method: 'get',
    path: '/getPostsAsPage',
    controller: PostController,
    action: 'getPostsAsPage',
  }
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
