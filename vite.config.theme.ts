/*
 * @Author: hzm
 * @Date: 2022-08-30 09:43:42
 * @Description: 
 */

import type { UserConfigExport } from 'vite'
import { resolve } from 'path'

export default (): UserConfigExport => {
    return {
        build: {
            outDir: resolve(__dirname, 'dist/dist'),
            emptyOutDir: false,
            rollupOptions: {
                input: resolve(__dirname, 'packages/theme-chalk/index.scss'),
                output: {
                    assetFileNames: '[name].[ext]'
                }
            }
        }
    }
}
