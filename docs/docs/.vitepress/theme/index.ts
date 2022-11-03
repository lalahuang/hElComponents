import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "prismjs/themes/prism-funky.min.css";
import "h-components-next/dist/index.css";
import VpDemo  from '../src/vp-demo.vue';
import  '../theme/styles/index.scss';

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus);
    app.component('Demo',VpDemo)
  },
};