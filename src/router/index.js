import { createRouter, createWebHistory } from 'vue-router'
import { getUserState } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresUnauth: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: { requiresUnauth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)

  const isAuth = await getUserState()

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router
