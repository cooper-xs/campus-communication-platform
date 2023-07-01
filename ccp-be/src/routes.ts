import Router from '@koa/router';
import { Context, Next } from 'koa';
import IdentityController from './controller/IdentityController';
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
    path: '/uploadMP4',
    controller: ActivityController,
    action: 'uploadMP4',
  },
  {
    method: 'post',
    path: '/deleteVideo',
    controller: ActivityController,
    action: 'deleteVideo',
  },

  // 个人信息
  {
    method: 'post',
    path: '/login',
    controller: IdentityController,
    action: 'login',
  },
  {
    method: 'post',
    path: '/register',
    controller: IdentityController,
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
  {
    method: 'post',
    path: '/updateProfile',
    controller: IdentityController,
    action: 'updateProfile',
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
    path: '/getPosts',
    controller: PostController,
    action: 'getPosts',
  },
  {
    method: 'get',
    path: '/getComments',
    controller: PostController,
    action: 'getComments',
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
  },
  {
    method: 'post',
    path: '/addVideo',
    controller: ActivityController,
    action: 'addVideo',
  },
  {
    method: 'get',
    path: '/getVideosByActivityId',
    controller: ActivityController,
    action: 'getVideosByActivityId',
  },
  {
    method: 'post',
    path: '/addActivity',
    controller: ActivityController,
    action: 'addActivity',
  },
  {
    method: 'post',
    path: '/updateActivity',
    controller: ActivityController,
    action: 'updateActivity',
  },
  {
    method: 'post',
    path: '/signUpActivity',
    controller: ActivityController,
    action: 'signUpActivity',
  }, 
  {
    method: 'get',
    path: '/getSignUpFlag',
    controller: ActivityController,
    action: 'getSignUpFlag',
  },
  {
    method: 'get',
    path: '/getRegistrations',
    controller: ActivityController,
    action: 'getRegistrations',
  },
  {
    method: 'post',
    path: '/reviewRegistration',
    controller: ActivityController,
    action: 'reviewRegistration',
  },
];

const router = new Router();

routes.forEach((route) => {
  const middlewares = [];
  if(route.action === 'uploadMP4') {
    middlewares.push(upload);
  }
  router[route.method](route.path, ...middlewares, async (ctx: Context) => {
    // eslint-disable-next-line new-cap
    const controller = new route.controller(ctx);
    if(route.action === 'uploadMP4') {
      // @ts-ignore
      return await controller[route.action](ctx.req.files);
    }
    return await controller[route.action]();
  });
});

export default router;
