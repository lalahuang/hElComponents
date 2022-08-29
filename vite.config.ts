import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({})],
  build: {
    commonjsOptions: {
      esmExternals: true
    },
    outDir: "es",
    minify: false,
    
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue','element-plus'],
      output: { 
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          "element-plus":"element-plus"
        },
      },
    },
    
    lib: {
      entry: './src/packages/index.ts',
      name: 'hComponents',
      fileName: 'h-components',
    },
  },
})

