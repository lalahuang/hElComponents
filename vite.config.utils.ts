/*
 * @Author: hzm
 * @Date: 2022-08-31 09:47:08
 * @Description: 
 */
import { defineConfig } from 'vite'

import type { UserConfigExport } from 'vite'

import { resolve } from 'path'
import dts from 'vite-plugin-dts' // https://github.com/qmhc/vite-plugin-dts
const utils = resolve(__dirname, 'packages/utils');
console.log('resolve(utils, ', resolve(utils, 'index.ts'));

export default (): UserConfigExport => {
    return {
        plugins: [
            dts({
                entryRoot: resolve(__dirname, 'packages/utils'),
                outputDir: [resolve(__dirname, './distutils/es'), resolve(__dirname, './distutils/lib')],
            }),
        ],
        mode: 'production',
        build: {
            target: 'modules',
            //压缩
            minify: true,
            rollupOptions: {
                input: [resolve(utils, 'index.ts') ],
                output: [
                    {
                        format: 'es',
                        //不用打包成.es.js,这里我们想把它打包成.js
                        entryFileNames: '[name].js',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        dir: resolve(__dirname, './distutils/es')
                    },
                    {
                        format: 'cjs',
                        //不用打包成.mjs
                        entryFileNames: '[name].js',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        dir: resolve(__dirname, './distutils/lib')
                    }
                ]
            },
            lib: {
                entry: resolve(utils, 'index.ts'),
                name: 'hutils',
            }
        },
    }
}


