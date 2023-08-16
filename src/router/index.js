// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/anime/:id',
        name: 'AnimeDetails',
        component: () => import(/* webpackChunkName: "AnimeDetails" */ '@/views/AnimeDetails.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/LoginPage.vue'),
      },
      {
        path: '/register',
        name: 'RegisterPage',
        component: () => import(/* webpackChunkName: "RegisterPage" */ '@/views/RegisterPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
