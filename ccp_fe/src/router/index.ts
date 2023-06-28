import { createRouter, createWebHistory } from 'vue-router';
// import Main from '../views/MainView.vue';
import Main from '@/views/MainView.vue';
// import a from '@/views/test';
import a from '../views/test';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: '登录',
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: '注册',
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '这页面不对吧??',
      },  
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? to.meta.title + ' | 校园交流平台' : '校园交流平台';

  // 检查是否需要登录
  // const isLoggedIn = useAdminStore().isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  // if (to.path.startsWith('/admin') && !isLoggedIn) {
  //   next('/login');
  // } else {
  //   next();
  // }
});

export default router;
