/*
 * @Author: hzm
 * @Date: 2022-08-30 09:42:15
 * @Description: 
 */
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import type { UserConfigExport } from 'vite'

export default (): UserConfigExport => {
    return {
        plugins: [
            vue(),
            dts({
                entryRoot: resolve(__dirname, 'packages/components'),
                outputDir: [resolve(__dirname, './dist/lib')],
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
            minify: true,
            chunkSizeWarningLimit: 2,
            reportCompressedSize: false,
            emptyOutDir: false,
            outDir: resolve(__dirname, 'dist/lib'),
            lib: {
                entry: resolve(__dirname, 'packages/components/index.ts'),
                formats: ['cjs'],
                fileName: (): string => {
                    return 'index.cjs'
                }
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    preserveModules: true,
                    exports: 'named' // https://rollupjs.org/guide/en/#outputexports
                }
            }
        }
    }
}
