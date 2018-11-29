import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/answer',
      name: 'answer',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: 'about' */ '@/views/Answer')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/views/Personal')
    },
    {
      path: '/personal/order',
      component: () => import('@/views/Personal/Order')
    },
    {
      path: '/personal/address',
      component: () => import('@/views/Personal/Address')
    },
    {
      path: '/personal/develop',
      component: () => import('@/views/Personal/Develop')
    },
    {
      path: '/login',
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      component: () => import('@/views/Login/register')
    }
  ]
});
