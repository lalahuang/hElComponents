import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts' // https://github.com/qmhc/vite-plugin-dts

export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      vueJsx({}),
      dts({
        entryRoot: resolve(__dirname, 'packages/components'),
        outputDir: [resolve(__dirname, './dist/es')],
        cleanVueFileName:false
      }),
      vueSetupExtend(),
      Components({
        dts: resolve(
          __dirname,
          '/packages/components/global-components.d.ts'
        )
      })
    ],
    mode: 'production',
    build: {
      target: 'modules',
      minify: true, // 压缩
      chunkSizeWarningLimit: 2, // 超过 2kb 警告提示
      reportCompressedSize: false,
      emptyOutDir: false,
      outDir: resolve(__dirname, 'dist/es'),
      lib: {
        entry: resolve(__dirname, 'packages/components/index.ts'),
        formats: ['es'],
        fileName: (): string => {
          return 'index.mjs'
        }
      },
      rollupOptions: {
        external: ['vue'], // 确保外部化处理那些你不想打包进库的依赖
        output: {
          preserveModules: true // 让打包目录和目录对应 https://rollupjs.org/guide/en/#outputpreservemodules
        }
      }
    }
  }
}


