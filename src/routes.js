import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import SingupView from '@/views/SingupView.vue'
import HomeView from './views/HomeView.vue'

const routes = [
  { 
    path: '/login', 
    component: LoginView,
  },
  { 
    path: '/singup', 
    component: SingupView,
  },
  { 
    path: '/home', 
    component: HomeView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (!token && to.path != '/login' && to.path != '/singup') {
    next('/login')
  } else if (token && to.path == '/login') {
    next('/home')
  } else {
    next()
  }
})

export default router
