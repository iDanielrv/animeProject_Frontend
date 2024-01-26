// Composables
import { createRouter, createWebHistory, } from 'vue-router'
import Cookies from 'js-cookie';


const routes = [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage.vue'),
      },
      {
        path: '/anime/:id',
        name: 'AnimeDetails',
        component: () => import(/* webpackChunkName: "AnimeDetails" */ '@/views/AnimeDetails.vue'),
      },
      {
        path: '/login',
        name: 'LoginPage',
        component: () => import('@/views/LoginPage.vue'),
      },
      {
        path: '/register',
        name: 'RegisterPage',
        component: () => import('@/views/RegisterPage.vue'),
      },
      {
        path: '/seasonSearch',
        name: 'SeasonList',
        component: () => import('@/views/SeasonList.vue'),
      },
      {
        path: '/upcoming',
        name: 'upcomingAnimes',
        component: () => import('@/views/UpComing.vue'),
      },
      {
        path: '/testandohehe',
        name: 'TestandoHehe',
        component: () => import('@/views/TestandoHehe.vue'),
      },
      {
        path: '/testandoFilter',
        name: 'testandoFilter',
        component: () => import('@/views/TestandoFilter.vue'),
      },
    ]
    
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  let publicPages = ['/','/login', '/register'];
  let isAuthenticated = !publicPages.includes(to.path);
  let loggedIn = Cookies.get('jwt')


  if (isAuthenticated && !loggedIn) next('/login');
  else next();
})



export default router
