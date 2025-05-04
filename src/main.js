import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router'

import '@/assets/styles/fonts.css'
import '@/assets/styles/interview-columns.css'


createApp(App)
    .use(router)
    .use(Toast, {
        // 글로벌 옵션 예시
        position: 'top-right',
        timeout: 3000,
    })
    .mount('#app')
