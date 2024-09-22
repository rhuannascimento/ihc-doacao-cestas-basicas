import { registerPlugins } from '@/plugins'
import router from "./routes"

import App from './App.vue'
import { createApp } from 'vue'

const app = createApp(App)
app.use(router)
registerPlugins(app)
app.mount('#app')
