/*
 * @Author: hzm
 * @Date: 2022-08-30 10:21:02
 * @Description: 
 */
const { copyFileSync } = require("fs");
const { version } = require("../packages/components/package.json");

const FILE = [
  {
    input: "./packages/components/package.json",
    outDir: "dist/package.json",
  },
];

FILE.forEach((item) => {
  copyFileSync(item.input, item.outDir);
});

console.warn("\n" + ` ${version} 版本打包成功 🎉🎉🎉` + "\n");
