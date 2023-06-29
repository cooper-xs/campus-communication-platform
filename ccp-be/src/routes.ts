import Router from '@koa/router';
import { Context, Next } from 'koa';
import LoginController from './controller/LoginController';
import PostController from './controller/PostController'
import { IRoute } from './types';
import StudentController from './controller/StudentController';
import ActivityController from './controller/ActivityController';
import TeacherController from './controller/TeacherController';
import multer from "koa-multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('file', 5); // 最多上传5个文件

const routes: IRoute[] = [
  {
    method: 'post',
    path: '/upload',
    controller: ActivityController,
    action: 'upload',
  },
  {
    method: 'post',
    path: '/login',
    controller: LoginController,
    action: 'login',
  },
  {
    method: 'post',
    path: '/register',
    controller: LoginController,
    action: 'register',
  },
  {
    method: 'get',
    path: '/getStudentById',
    controller: StudentController,
    action: 'findStudentById',
  },
  {
    method: 'get',
    path: '/getTeacherById',
    controller: TeacherController,
    action: 'findTeacherById',
  },

  // 帖子
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
    // needLogin: true,
  },
  {
    method: 'get',
    path: '/getPostsAsPage',
    controller: PostController,
    action: 'getPostsAsPage',
  },


  // 活动
  {
    method: 'get',
    path: '/getActivities',
    controller: ActivityController,
    action: 'getActivities',
  },
  {
    method: 'get',
    path: '/getActivity',
    controller: ActivityController,
    action: 'getActivity',
  }
];

const router = new Router();

routes.forEach((route) => {
  const middlewares = [];
  if(route.action === 'upload') {
    middlewares.push(upload);
  }
  router[route.method](route.path, ...middlewares, async (ctx: Context) => {
    // eslint-disable-next-line new-cap
    const controller = new route.controller(ctx);
    if(route.action === 'upload') {
      // @ts-ignore
      return await controller[route.action](ctx.req.files);
    }
    return await controller[route.action]();
  });
});

export default router;
