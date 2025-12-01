import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 1. 引入 Ant Design Vue (保留旧的)
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 2. 引入 Element Plus (新增的)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果需要 Element Plus 中文包
// import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 3. 同时注册两个插件
app.use(Antd)        // 注册 Ant Design
app.use(ElementPlus) // 注册 Element Plus
// app.use(ElementPlus, { locale: zhCn }) 

app.mount('#app')