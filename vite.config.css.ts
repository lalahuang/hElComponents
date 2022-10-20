/*
 * @Author: hzm
 * @Date: 2022-08-30 09:10:38
 * @Description: 
 */
import type { UserConfigExport } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

const input: string = resolve(__dirname, 'packages/theme-chalk/src')

export default (): UserConfigExport => {
    return {
        build: {
            assetsDir: 'theme',
            rollupOptions: {
                input: readdirSync(input).map((name): string => {
                    return `${input}/${name}`
                }),
                output: {
                    entryFileNames: 'theme/[name].js',
                    chunkFileNames: 'theme/[name].js',
                    assetFileNames: 'theme/[name].[ext]'
                }
            }
        }
    }
}
