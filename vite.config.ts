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
        entryRoot: resolve(__dirname, "packages/components"),
        outputDir: [
          resolve(__dirname, "./dist/es"),
          resolve(__dirname, "./dist/lib"),
        ],
        cleanVueFileName: false,
      }),
      vueSetupExtend(),
      Components({
        dts: resolve(__dirname, "/packages/components/global-components.d.ts"),
      }),
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": resolve(__dirname, "./"),
        // 设置别名
        "@": resolve(__dirname, "./packages"),
        "@comp": resolve(__dirname, "./packages/components"),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    mode: "production",
    build: {
      target: "modules",
      minify: true, // 压缩
      chunkSizeWarningLimit: 2, // 超过 2kb 警告提示
      reportCompressedSize: false,
      emptyOutDir: false,
      outDir: resolve(__dirname, "dist/es"),
      lib: {
        entry: resolve(__dirname, "packages/components/index.ts"),
        name: "hcomponents",
      },
      rollupOptions: {
        input: [resolve(__dirname, "packages/components/index.ts")],
        external: ["vue", "@h-components/utils", "element-plus"], // 确保外部化处理那些你不想打包进库的依赖
        output: [
          {
            format: "es",
            //不用打包成.es.js,这里我们想把它打包成.js
            entryFileNames: "[name].js",
            //让打包目录和我们目录对应
            preserveModules: true,
            //配置打包根目录
            dir: resolve(__dirname, "./dist/es"),
          },
          {
            format: "cjs",
            //不用打包成.mjs
            entryFileNames: "[name].js",
            //让打包目录和我们目录对应
            preserveModules: true,
            //配置打包根目录
            dir: resolve(__dirname, "./dist/lib"),
          },
        ],
      },
    },
  };
}


