import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@h-components/theme-chalk/index.scss"
// console.log('@h-components/theme-chalk: ', @h-components/theme-chalk);

createApp(App).use(ElementPlus).mount('#app')
