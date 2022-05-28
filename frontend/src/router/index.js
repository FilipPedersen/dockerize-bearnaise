import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';

const routes = [
  {
    path: '/',
    name: 'Frontpage',
    component: () => import(/* webpackChunkName: "[request]" */ '../views/Frontpage.vue'),
  },
  {
    path: '/tos',
    name: 'Tos',
    component: () => import(/* webpackChunkName: "[request]" */ '../components/TermsOfService.vue'),
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "[request]" */ '../views/category/Category.vue'),
  },
  {
    path: '/:username',
    name: 'User',

    component: () => import(/* webpackChunkName: "[request]" */ '../views/user/User.vue'),
    children: [
      {
        path: '',
        name: 'UserProfile',
        component: () => import(/* webpackChunkName: "[request]" */ '../views/user/Profile.vue'),
      },
      {
        path: '/:username/:slug',
        name: 'UserRecipe',

        component: () => import(/* webpackChunkName: "[request]" */ '../views/user/Recipe.vue'),
      },
    ],
  },
  {
    path: '/create',
    name: 'CreateRecipe',
    meta: {
      title: 'Create Recipe',
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "[request]" */ '../views/user/RecipeBuilder.vue'),
  },
  {
    path: '/settings',
    name: 'UserSettings',
    meta: {
      title: 'Settings',
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "[request]" */ '../views/user/Settings.vue'),
  },
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  let userInfoLocal = null;

  if (!store?.getters?.getUserInfo?.id) {
    userInfoLocal = JSON.parse(localStorage.getItem('userInfo') || '{}');
  }

  const autheticated =
    (userInfoLocal?.id !== null && userInfoLocal?.id !== undefined) ||
    (store?.getters?.getUserInfo?.id !== null && store?.getters?.getUserInfo?.id !== undefined);

  if (!autheticated && to.matched.some((record) => record.meta.requiresAuth)) {
    next({
      path: '/',
      params: { nextUrl: to.fullPath },
    });

    window.scrollTo(0, 0);
    return;
  }

  next();
  window.scrollTo(0, 0);
});

export default router;
