/*
 * @Author: hzm
 * @Date: 2022-08-31 10:07:34
 * @Description: 
 */

const { copyFileSync } = require("fs");
const { version } = require("../packages/utils/package.json");

const FILE = [
  {
    input: "./packages/utils/package.json",
    outDir: "distutils/package.json",
  },
];

FILE.forEach((item) => {
  copyFileSync(item.input, item.outDir);
});

console.warn("\n" + ` ${version} 版本打包成功 🎉🎉🎉` + "\n");
