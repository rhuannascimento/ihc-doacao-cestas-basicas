import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SingupView from '@/views/SingupView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateFamilyView from '@/views/CreateFamilyView.vue'
import FamilyView from '@/views/FamilyView.vue'
import DonateProgressView from '@/views/DonateProgressView.vue'
import CreateDonateView from './views/CreateDonateView.vue'
import DonateHistoryView from './views/DonateHistoryView.vue'
import BasketView from './views/BasketView.vue'

const publicRoutes = [
  { 
    path: '/login', 
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  { 
    path: '/signup', 
    name: 'signup',
    component: SingupView,
    meta: { requiresAuth: false }
  }
]

const protectedRoutes = [
  {
    path: '/create-family', 
    name: 'createFamily',
    component: CreateFamilyView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/family', 
    name: 'family',
    component: FamilyView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/donate-basket', 
    name: 'donateBasket',
    component: CreateDonateView,
    meta: { requiresAuth: true }
  },
  {
    path: '/donate-progress', 
    name: 'donateProgress',
    component: DonateProgressView,
    meta: { requiresAuth: true }
  },
  {
    path: '/donate-history', 
    name: 'donateHistory',
    component: DonateHistoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/basket', 
    name: 'basket',
    component: BasketView,
    meta: { requiresAuth: true }
  }
]

const routes = [
  ...publicRoutes,
  { 
    path: '/home', 
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    children: protectedRoutes
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

 
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

 
  if (token && !to.meta.requiresAuth) {
    return next(isAdmin ? '/family' : '/home');
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return next('/home');
  }

  next();
})

export default router
