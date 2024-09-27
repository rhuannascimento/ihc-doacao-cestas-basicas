import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SingupView from '@/views/SingupView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateFamilyView from '@/views/CreateFamilyView.vue'
import FamilyView from '@/views/FamilyView.vue'
import DonateProgressView from '@/views/DonateProgressView.vue'
import CreateDonateView from './views/CreateDonateView.vue'

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
    children: [
      {
        path: '/create-family', 
        component: CreateFamilyView,
      },
      {
        path: '/family', 
        component: FamilyView,
      },
      {
        path: '/donate-basket', 
        component: CreateDonateView,
      },
      {
        path: '/donate-progress', 
        component: DonateProgressView,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const adminPaths = ['/create-family', '/family'];
  if (!token && to.path != '/login' && to.path != '/singup') {
    next('/login')
  } else if (token && to.path == '/login') {
    if(role == 'admin'){
      next('/family')
    }else{
      next('/home')
    }
  }else {
    if(adminPaths.includes(to.path)){
        if(role == 'admin'){
          next()
        }else{
          next('/home')
        }
    }else{
      next()
    }
  }
})

export default router
