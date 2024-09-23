import { createMemoryHistory, createRouter } from 'vue-router'

import Root from './App.vue'
import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'

const routes = [
  { 
    path: '/', 
    component: Root,
  },
  { 
    path: '/login', 
    component: LoginView,
  },
  { 
    path: '/home', 
    component: HomeView,
  },
]


const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;