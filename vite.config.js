import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      '/user/signup/google': 'http://localhost:8080', // 백엔드 API 서버 주소
      '/oauth2': 'http://localhost:8080', // oauth 리디렉트 받을 때도 프록시 필요
      '/login': 'http://localhost:8080', // 이 경로도 필요할 수 있음
    },
    // ✅ 이 부분 추가
    fs: {
      strict: false
    }
  },
  // ✅ 이 부분 추가
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
