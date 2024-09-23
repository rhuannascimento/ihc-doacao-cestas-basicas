import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './App.vue'
import LoginView from './views/LoginView.vue'

const routes = [
  { 
    path: '/', 
    component: HomeView,
  },
  { 
    path: '/login', 
    component: LoginView,
  },
]


const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;