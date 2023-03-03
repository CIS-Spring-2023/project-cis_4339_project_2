import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia();
pinia.use(({ store }) => {
    store.$router = markRaw(router)
});

app.use(pinia)
app.use(router)
app.mount('#app')
