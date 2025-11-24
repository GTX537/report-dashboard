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
  // 👇 新增：配置代理，解决跨域并指向你的 .NET 后端
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7236', // 你的后端实际地址
        changeOrigin: true,
        secure: false, // 忽略 SSL 证书错误 (关键，因为是本地 localhost)
      }
    }
  }
})