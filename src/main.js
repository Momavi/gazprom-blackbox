import { createApp } from 'vue'
import { router } from './routes.js';
import { createPinia } from 'pinia'

import './style.css'

const pinia = createPinia()
import App from './App.vue'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
