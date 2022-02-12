import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import './registerServiceWorker'
import store from './store/index.js'

import './styles/reset.css'
import './styles/main.css'
import './styles/layout.css'
import './styles/functions.css'
import './styles/color.css'

createApp(App).use(store).use(router).mount('#app')
