import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'

import '@/assets/styles/fonts.css'
import '@/assets/styles/interview-columns.css'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@/features/board/quill-config.js'

import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { refreshUserToken } from '@/features/user/api.js'

async function bootstrap() {
    const app = createApp(App)

    const pinia = createPinia()
    app.use(pinia)

    // ✅ Pinia 생성 후 auth 상태 복구
    const authStore = useAuthStore()
    try {
        const resp = await refreshUserToken()
        authStore.setAuth(resp.data.data.accessToken)
        console.log('초기화 : 로그인 상태 유지')
    } catch (e) {
        console.log('초기화 : 로그아웃 상태 유지')
    }

    app
        .use(router)
        .use(Toast, {
            position: 'top-right',
            timeout: 3000,
        })
        .component('QuillEditor', QuillEditor)
        .mount('#app')
}

bootstrap()
