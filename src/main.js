import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router'

import '@/assets/styles/fonts.css'
import '@/assets/styles/interview-columns.css'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { createPinia } from 'pinia'; // ✅ Pinia import

const app = createApp(App);
const pinia = createPinia();         // ✅ Pinia 인스턴스 생성

app
    .use(router)
    .use(pinia)                        // ✅ Pinia 등록
    .use(Toast, {
        position: 'top-right',
        timeout: 3000,
    })
    .component('QuillEditor', QuillEditor)
    .mount('#app');
