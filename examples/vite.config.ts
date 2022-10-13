import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({}),],
  resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": resolve(__dirname, "./"),
        // 设置别名
        "@": resolve(__dirname, "../packages"),
        "@comp": resolve(__dirname, "../packages/components"),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
})
