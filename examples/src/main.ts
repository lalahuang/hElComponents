import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@h-components/theme-chalk/index.scss"
// console.log('@h-components/theme-chalk: ', @h-components/theme-chalk);
import ElementPro from "element-pro-components";
import "element-pro-components/lib/styles/index";

createApp(App).use(ElementPlus).use(ElementPro).mount('#app')
