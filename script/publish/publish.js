/*
 * @Author: hzm
 * @Date: 2022-08-31 12:59:34
 * @Description:
 */
const { rootPath,componentPath } = require("../utils/paths.js");
const run = require("../utils/run.js");
const { src, dest } = require("gulp");
const { resolve } = require("path");
const rename = require("gulp-rename");
// const { version } = require("../../packages/utils/package.json");
const compPath = resolve(componentPath, "./package.pro.json");
const distPath = resolve(rootPath, "./dist");
//复制
const copypackage = async () => {
  return src(compPath)
    .pipe(rename({basename:"package", extname: ".json" }))
    .pipe(dest(distPath));
};
//发布组件
exports.publish = async () => {
  

  //先给transitpkg升个版本
  await run("pnpm version patch ", componentPath);
  //复制到dist目录
  await copypackage();
  //在dist下执行发布命令
  // await run("npm publish --access=public", distPath);

  await run("npm publish --access=public", distPath);
};
 